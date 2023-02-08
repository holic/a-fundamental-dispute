import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import Link from "next/link";
import { useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import { gql } from "urql";
import {
  useAccount,
  useBalance,
  useContractWrite,
  usePrepareContractWrite,
  useSwitchNetwork,
} from "wagmi";

import { useMintButtonQuery } from "../codegen/indexer";
import { ButtonLink } from "./ButtonLink";
import { holderPrice, publicPrice } from "./constants";
import { contracts, tokenContract } from "./contracts";
import { targetChainId } from "./EthereumProviders";
import { extractContractError } from "./extractContractError";
import { HoverLabel } from "./HoverLabel";
import { useMintSignature } from "./MintSignature";
import { promiseNotify } from "./promiseNotify";
import { usePromiseFn } from "./usePromiseFn";

gql`
  query MintButton($address: ID!) {
    foldedFacesTokens(where: { owner: $address, mintDiscountUsed: false }) {
      id
      tokenId
    }
  }
`;

const ActualMintButton = ({
  address,
  mintSignature,
}: {
  address: string;
  mintSignature: string;
}) => {
  const [{ data }] = useMintButtonQuery(
    address ? { variables: { address } } : { pause: true }
  );
  const discountTokens = useMemo(
    () => data?.foldedFacesTokens.map((token) => token.tokenId) ?? [],
    [data]
  );

  const preparedDiscountedMint = usePrepareContractWrite({
    ...contracts.AFundamentalDispute,
    functionName: "foldedFacesMint",
    args: [
      discountTokens.map(ethers.BigNumber.from),
      mintSignature as `0x${string}`,
    ],
    overrides: {
      value: ethers.utils.parseEther(holderPrice),
    },
    enabled: discountTokens.length >= 1,
  });

  const preparedMint = usePrepareContractWrite({
    ...contracts.AFundamentalDispute,
    functionName: "mint",
    args: [mintSignature as `0x${string}`],
    overrides: {
      value: ethers.utils.parseEther(publicPrice),
    },
  });

  const discountedMintWrite = useContractWrite(preparedDiscountedMint.config);
  const mintWrite = useContractWrite(preparedMint.config);

  const writeConfig = preparedDiscountedMint.isSuccess
    ? preparedDiscountedMint
    : preparedMint.isSuccess
    ? preparedMint
    : null;

  const writeConfigPending = writeConfig
    ? false
    : preparedDiscountedMint.isLoading || preparedMint.isLoading;

  const writeConfigError = writeConfig
    ? null
    : preparedMint.error ?? preparedDiscountedMint.error;

  if (writeConfigError) {
    console.error(
      "Can't mint:",
      extractContractError(writeConfigError),
      writeConfigError
    );
  }

  const writeAsync = preparedDiscountedMint.isSuccess
    ? discountedMintWrite.writeAsync
    : preparedMint.isSuccess
    ? mintWrite.writeAsync
    : null;

  const [mintResult, mint] = usePromiseFn(
    useCallback(
      async (onProgress: (message: string) => void) => {
        if (!writeAsync) {
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
    )
  );

  if (writeConfigPending) {
    return (
      <ButtonLink pending>
        <HoverLabel label="Mint a piece ☼" labelHover="Loading…" />
      </ButtonLink>
    );
  }

  if (writeConfigError) {
    return (
      <ButtonLink disabled>
        <HoverLabel
          label="Mint a piece ☼"
          labelHover={`${extractContractError(writeConfigError)} ☹︎`}
        />
      </ButtonLink>
    );
  }

  if (!mint) {
    return (
      <ButtonLink disabled>
        <HoverLabel label="Mint a piece ☼" labelHover="Can't mint ☹︎" />
      </ButtonLink>
    );
  }

  return (
    <ButtonLink
      pending={mintResult.type === "pending"}
      onClick={(event) => {
        event.preventDefault();
        const toastId = toast.loading("Preparing…");
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
                    <a className="underline" onClick={() => toast.dismiss()}>
                      View your piece &rarr;
                    </a>
                  </Link>
                </>
              ),
              autoClose: 15000,
              closeButton: true,
            });
          },
          (error) => {
            toast.update(toastId, {
              isLoading: false,
              type: "error",
              render: String(error.message),
              autoClose: 15000,
              closeButton: true,
            });
          }
        );
      }}
    >
      {mintResult.type === "pending" ? (
        "Minting…"
      ) : (
        <HoverLabel
          label="Mint a piece ☼"
          labelHover={
            writeConfig?.config.functionName === "foldedFacesMint" ? (
              <>
                Mint a discounted piece for{" "}
                <span className="font-sans text-xs font-bold">Ξ</span>
                {holderPrice} ⇒
              </>
            ) : (
              <>
                Mint a piece for{" "}
                <span className="font-sans text-xs font-bold">Ξ</span>
                {publicPrice} ⇒
              </>
            )
          }
        />
      )}
    </ButtonLink>
  );
};

export const MintButton = () => {
  const { switchNetwork } = useSwitchNetwork();
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { mintSignature, error: mintSignatureError } = useMintSignature();

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

        if (balance && balance.value.lt(ethers.utils.parseEther(publicPrice))) {
          return (
            <ButtonLink disabled>
              <HoverLabel
                label="Mint a piece ☼"
                labelHover="Insufficient funds ☹︎"
              />
            </ButtonLink>
          );
        }

        if (mintSignatureError) {
          return (
            <ButtonLink disabled>
              <HoverLabel
                label="Mint a piece ☼"
                labelHover={`${mintSignatureError} ☹︎`}
              />
            </ButtonLink>
          );
        }
        if (!mintSignature) {
          return (
            <ButtonLink pending>
              <HoverLabel label="Mint a piece ☼" labelHover="Thinking…" />
            </ButtonLink>
          );
        }

        return (
          <ActualMintButton
            address={account.address}
            mintSignature={mintSignature}
          />
        );
      }}
    </ConnectButton.Custom>
  );
};
