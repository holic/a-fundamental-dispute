import goerliDeploys from "@web3-scaffold/contracts/deploys/goerli.json";
import { AFundamentalDispute__factory } from "@web3-scaffold/contracts/types";

import { provider, targetChainId } from "./EthereumProviders";

export const tokenContract = AFundamentalDispute__factory.connect(
  goerliDeploys.AFundamentalDispute.contractAddress,
  provider({ chainId: targetChainId })
);
