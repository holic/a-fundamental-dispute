import mainnetDeploys from "@web3-scaffold/contracts/deploys/mainnet.json";
import {
  AFDRenderer__factory,
  AFundamentalDispute__factory,
} from "@web3-scaffold/contracts/types";

import { provider, targetChainId } from "./EthereumProviders";

export const getContracts = () => {
  if (targetChainId === 1) {
    return {
      AFundamentalDispute: {
        chainId: targetChainId,
        address: mainnetDeploys.AFundamentalDispute.contractAddress,
        abi: AFundamentalDispute__factory.abi,
      },
      AFDRenderer: {
        chainId: targetChainId,
        address: mainnetDeploys.AFDRenderer.contractAddress,
        abi: AFDRenderer__factory.abi,
      },
    };
  }
  throw new Error("Unsupported chain ID");
};

export const contracts = getContracts();

export const tokenContract = AFundamentalDispute__factory.connect(
  mainnetDeploys.AFundamentalDispute.contractAddress,
  provider({ chainId: targetChainId })
);

export const rendererContract = AFDRenderer__factory.connect(
  mainnetDeploys.AFDRenderer.contractAddress,
  provider({ chainId: targetChainId })
);
