import goerliDeploys from "@web3-scaffold/contracts/deploys/goerli.json";
import {
  AFDRenderer__factory,
  AFundamentalDispute__factory,
} from "@web3-scaffold/contracts/types";

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

export const tokenContract = AFundamentalDispute__factory.connect(
  goerliDeploys.AFundamentalDispute.contractAddress,
  provider({ chainId: targetChainId })
);

export const rendererContract = AFDRenderer__factory.connect(
  goerliDeploys.AFDRenderer.contractAddress,
  provider({ chainId: targetChainId })
);
