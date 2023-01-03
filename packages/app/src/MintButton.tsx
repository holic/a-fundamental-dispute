import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
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
import { contracts } from "./contracts";
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
      value: ethers.utils.parseEther("0.08"),
    },
    enabled: !discountTokens.length,
  });
  const preparedMintWrite = usePrepareContractWrite({
    address: contracts.AFundamentalDispute,
    abi: AFundamentalDisputeAbi,
    functionName: "mint",
    overrides: {
      value: ethers.utils.parseEther("0.1"),
    },
  });

  const foldedFacesMintWrite = useContractWrite(
    preparedFoldedFacesMintWrite.config
  );
  const mintWrite = useContractWrite(preparedMintWrite.config);
  const writeAsync = foldedFacesMintWrite.writeAsync ?? mintWrite.writeAsync;

  const [mintResult, mint] = usePromiseFn(
    async (onProgress: (message: string) => void) => {
      if (!writeAsync) {
        throw new Error("Prepared transaction not ready");
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

        return { receipt };
      } catch (error) {
        console.error("Transaction error:", error);
        const contractError = extractContractError(error);
        throw new Error(`Transaction error: ${contractError}`);
      }
    },
    [writeAsync]
  );

  return (
    <ConnectButton.Custom>
      {({ mounted, account, chain, openConnectModal }) => {
        if (mounted && !account) {
          return (
            <ButtonLink onClick={openConnectModal}>
              <HoverLabel
                label="Mint a piece ☼"
                labelHover="Connect wallet ☼"
              />
            </ButtonLink>
          );
        }
        if (mounted && chain && chain.id !== targetChainId) {
          return (
            <ButtonLink onClick={() => switchNetwork?.(targetChainId)}>
              <HoverLabel
                label="Mint a piece ☼"
                labelHover="Switch network ☼"
              />
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
                () => {
                  // TODO: show etherscan link?
                  toast.update(toastId, {
                    isLoading: false,
                    type: "success",
                    render: <>Minted!</>,
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
                foldedFacesMintWrite.writeAsync ? (
                  <>
                    Mint a discounted piece for{" "}
                    <span className="font-sans text-xs font-bold">Ξ</span>0.08 ☼
                  </>
                ) : (
                  <>
                    Mint a piece for{" "}
                    <span className="font-sans text-xs font-bold">Ξ</span>0.1 ☼
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
