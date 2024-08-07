import { Config, ResolvedConfig } from "@ponder/core";

import mainnetDeploys from "../contracts/deploys/mainnet.json";

const foldedFaces: NonNullable<ResolvedConfig["contracts"]>[number] = {
  name: "FoldedFaces",
  network: "mainnet",
  abi: "./abis/FoldedFaces.json",
  address: "0xf01dfac37dd149cb686e05d06cd21930b011f10f",
  startBlock: 14837058,
};

export const config: Config = {
  networks: [
    {
      name: "mainnet",
      chainId: 1,
      rpcUrl: process.env.PONDER_RPC_URL_1!,
      maxRpcRequestConcurrency: 1,
    },
  ],
  contracts: (() => {
    switch (process.env.CHAIN_ID) {
      case "1":
        return [
          foldedFaces,
          {
            name: "AFundamentalDispute",
            network: "mainnet",
            abi: "../contracts/abi/AFD.sol/AFundamentalDispute.abi.json",
            address: mainnetDeploys.AFundamentalDispute
              .contractAddress as `0x${string}`,
            startBlock: mainnetDeploys.AFundamentalDispute.blockNumber,
          },
          {
            name: "AFDRenderer",
            network: "mainnet",
            abi: "../contracts/abi/AFDRenderer.sol/AFDRenderer.abi.json",
            address: mainnetDeploys.AFDRenderer
              .contractAddress as `0x${string}`,
            startBlock: mainnetDeploys.AFDRenderer.blockNumber,
          },
        ];
      default:
        throw new Error(`Unsupported chain ID: ${process.env.CHAIN_ID}`);
    }
  })(),
};
