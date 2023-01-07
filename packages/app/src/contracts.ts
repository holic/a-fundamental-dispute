import goerliDeploys from "@web3-scaffold/contracts/deploys/goerli.json";
import { AFundamentalDispute__factory } from "@web3-scaffold/contracts/types";

import { AFundamentalDisputeAbi } from "./abi/AFundamentalDispute";
import { provider, targetChainId } from "./EthereumProviders";

export const getContracts = () => {
  if (targetChainId === 5) {
    return {
      AFundamentalDispute: {
        // TODO: upgrade wagmi to see if the "No wagmi client found" issue is fixed
        // chainId: targetChainId,
        address: goerliDeploys.AFundamentalDispute.contractAddress,
        abi: AFundamentalDisputeAbi,
      },
    };
  }
  throw new Error("Unsupported chain ID");
};

export const contracts =
  targetChainId === 5
    ? {
        AFundamentalDispute: goerliDeploys.AFundamentalDispute.contractAddress,
      }
    : {};

export const tokenContract = AFundamentalDispute__factory.connect(
  goerliDeploys.AFundamentalDispute.contractAddress,
  provider({ chainId: targetChainId })
);
