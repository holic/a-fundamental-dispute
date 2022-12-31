import { ConnectButton } from "@rainbow-me/rainbowkit";
import { utils } from "ethers";
import { toast } from "react-toastify";
import { useAccount, useSwitchNetwork } from "wagmi";

import { ButtonLink } from "./ButtonLink";
import { tokenContract } from "./contracts";
import { targetChainId } from "./EthereumProviders";
import { extractContractError } from "./extractContractError";
import { HoverLabel } from "./HoverLabel";
import { promiseNotify } from "./promiseNotify";
import { usePromiseFn } from "./usePromiseFn";

export const MintButton = () => {
  const { switchNetwork } = useSwitchNetwork();
  const { connector } = useAccount();

  const [mintResult, mint] = usePromiseFn(
    async (quantity: number, onProgress: (message: string) => void) => {
      if (!connector) {
        throw new Error("Wallet not connected");
      }

      const signer = await connector.getSigner();
      const contract = tokenContract.connect(signer);

      try {
        onProgress(`Minting…`);

        const tx = await promiseNotify(
          contract.mint({ value: utils.parseEther("0.1") })
        ).after(1000 * 5, () =>
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
    [connector]
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
              mint(1, (message) => {
                toast.update(toastId, { render: message });
              }).then(
                () => {
                  // TODO: show etherscan link?
                  toast.update(toastId, {
                    isLoading: false,
                    type: "success",
                    render: `Minted!`,
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
            Mint a piece ☼
          </ButtonLink>
        );
      }}
    </ConnectButton.Custom>
  );
};
