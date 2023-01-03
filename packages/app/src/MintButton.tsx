import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import Link from "next/link";
import { toast } from "react-toastify";
import { gql } from "urql";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useSwitchNetwork,
} from "wagmi";

import { useMintButtonQuery } from "../codegen/indexer";
import { AFundamentalDisputeAbi } from "./abi/AFundamentalDispute";
import { ButtonLink } from "./ButtonLink";
import { holderPrice, publicPrice } from "./constants";
import { contracts, tokenContract } from "./contracts";
import { targetChainId } from "./EthereumProviders";
import { extractContractError } from "./extractContractError";
import { HoverLabel } from "./HoverLabel";
import { promiseNotify } from "./promiseNotify";
import { usePromiseFn } from "./usePromiseFn";

gql`
  query MintButton($address: String!) {
    foldedFacesTokens(where: { ownerAddress: $address }) {
      id
      tokenId
      mintDiscountUsed
    }
  }
`;

export const MintButton = () => {
  const { switchNetwork } = useSwitchNetwork();
  const { address } = useAccount();

  const [{ data }] = useMintButtonQuery(
    address ? { variables: { address } } : { pause: true }
  );
  const discountTokens =
    data?.foldedFacesTokens
      .filter((token) => !token.mintDiscountUsed)
      .map((token) => token.tokenId) ?? [];
  const discountToken = discountTokens[0];

  const preparedFoldedFacesMintWrite = usePrepareContractWrite({
    address: contracts.AFundamentalDispute,
    abi: AFundamentalDisputeAbi,
    functionName: "foldedFacesMint",
    args: [ethers.BigNumber.from(discountToken ?? 0)],
    overrides: {
      value: ethers.utils.parseEther(holderPrice),
    },
    enabled: !discountTokens.length,
  });
  const preparedMintWrite = usePrepareContractWrite({
    address: contracts.AFundamentalDispute,
    abi: AFundamentalDisputeAbi,
    functionName: "mint",
    overrides: {
      value: ethers.utils.parseEther(publicPrice),
    },
  });

  if (preparedFoldedFacesMintWrite.isError) {
    try {
      console.log(
        "preparedFoldedFacesMintWrite.error",
        extractContractError(preparedFoldedFacesMintWrite.error)
      );
    } catch (e) {
      // ignore
    }
  }
  if (preparedMintWrite.isError) {
    try {
      console.log(
        "preparedMintWrite.error",
        extractContractError(preparedMintWrite.error)
      );
    } catch (e) {
      // ignore
    }
  }

  const foldedFacesMintWrite = useContractWrite(
    preparedFoldedFacesMintWrite.config
  );
  const mintWrite = useContractWrite(preparedMintWrite.config);

  const writeAsync = foldedFacesMintWrite.isSuccess
    ? foldedFacesMintWrite.writeAsync
    : mintWrite.isSuccess
    ? mintWrite.writeAsync
    : undefined;

  const [mintResult, mint] = usePromiseFn(
    async (onProgress: (message: string) => void) => {
      if (!address) {
        throw new Error("Not connected");
      }
      if (!writeAsync) {
        // TODO: parse prepared errors
        throw new Error(
          "You've already minted or there was an error preparing the transaction."
        );
      }

      try {
        onProgress("Minting…");

        const tx = await promiseNotify(writeAsync()).after(1000 * 5, () =>
          onProgress("Please confirm transaction in your wallet…")
        );
        console.log("mint tx", tx);

        onProgress("Finalizing transaction…");
        const receipt = await promiseNotify(tx.wait())
          .after(1000 * 15, () =>
            onProgress(
              "It can sometimes take a while to finalize a transaction…"
            )
          )
          .after(1000 * 30, () => onProgress("Still working on it…"));
        console.log("mint receipt", receipt);

        const tokenIds = await tokenContract.tokensOfOwner(address);
        console.log("token IDs", tokenIds);
        return { tx, receipt, tokenIds };
      } catch (error) {
        console.error("Transaction error:", error);
        const contractError = extractContractError(error);
        throw new Error(`Transaction error: ${contractError}`);
      }
    },
    [address, writeAsync]
  );

  return (
    <ConnectButton.Custom>
      {({ mounted, account, chain, openConnectModal }) => {
        if (!mounted) {
          return <ButtonLink disabled>Mint a piece ☼</ButtonLink>;
        }

        if (!account) {
          return (
            <ButtonLink onClick={openConnectModal}>
              <HoverLabel
                label="Mint a piece ☼"
                labelHover="Connect wallet ⇒"
              />
            </ButtonLink>
          );
        }

        if (chain && chain.id !== targetChainId) {
          return (
            <ButtonLink onClick={() => switchNetwork?.(targetChainId)}>
              <HoverLabel
                label="Mint a piece ☼"
                labelHover="Switch network ⇒"
              />
            </ButtonLink>
          );
        }

        // TODO: parse prepared errors
        // TODO: do balance check
        if (!writeAsync) {
          return (
            <ButtonLink disabled>
              <HoverLabel label="Mint a piece ☼" labelHover="Can't mint ☹︎" />
            </ButtonLink>
          );
        }

        return (
          <ButtonLink
            disabled={mintResult.type === "pending"}
            onClick={(event) => {
              event.preventDefault();
              const toastId = toast.loading("Starting…");
              mint((message) => {
                toast.update(toastId, { render: message });
              }).then(
                ({ tokenIds }) => {
                  const tokenId = tokenIds[tokenIds.length - 1];
                  toast.update(toastId, {
                    isLoading: false,
                    type: "success",
                    render: (
                      <>
                        Minted!{" "}
                        <Link href={`/art/${tokenId.toString()}`}>
                          <a
                            className="underline"
                            onClick={() => toast.dismiss()}
                          >
                            View your piece &rarr;
                          </a>
                        </Link>
                      </>
                    ),
                    autoClose: 5000,
                    closeButton: true,
                  });
                },
                (error) => {
                  toast.update(toastId, {
                    isLoading: false,
                    type: "error",
                    render: String(error.message),
                    autoClose: 5000,
                    closeButton: true,
                  });
                }
              );
            }}
          >
            <HoverLabel
              label="Mint a piece ☼"
              labelHover={
                preparedFoldedFacesMintWrite.isSuccess ? (
                  <>
                    Mint a discounted piece for{" "}
                    <span className="font-sans text-xs font-bold">Ξ</span>0.08 ⇒
                  </>
                ) : (
                  <>
                    Mint a piece for{" "}
                    <span className="font-sans text-xs font-bold">Ξ</span>0.1 ⇒
                  </>
                )
              }
            />
          </ButtonLink>
        );
      }}
    </ConnectButton.Custom>
  );
};
