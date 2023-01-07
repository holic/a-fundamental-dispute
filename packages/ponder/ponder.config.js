const { graphqlPlugin } = require("@ponder/graphql");
const goerliDeploys = require("@web3-scaffold/contracts/deploys/goerli.json");

/** @type {import('@ponder/core').PonderConfig['sources'][0]} */
const foldedFaces = {
  name: "FoldedFaces",
  network: "mainnet",
  abi: "./abis/FoldedFaces.json",
  address: "0xf01dfac37dd149cb686e05d06cd21930b011f10f",
  startBlock: 14837058,
};

/** @type {import('@ponder/core').PonderConfig} */
module.exports = {
  plugins: [graphqlPlugin()],
  database:
    process.env.NODE_ENV === "production"
      ? {
          kind: "postgres",
          connectionString: process.env.DATABASE_URL,
        }
      : {
          kind: "sqlite",
        },
  networks: [
    { name: "mainnet", chainId: 1, rpcUrl: process.env.PONDER_RPC_URL_1 },
    { name: "goerli", chainId: 5, rpcUrl: process.env.PONDER_RPC_URL_5 },
  ],
  sources: (() => {
    switch (process.env.CHAIN_ID) {
      case "1":
        return [foldedFaces];
      case "5":
        return [
          foldedFaces,
          {
            name: "AFundamentalDispute",
            network: "goerli",
            abi: "./node_modules/@web3-scaffold/contracts/abi/AFD.sol/AFundamentalDispute.abi.json",
            address: goerliDeploys.AFundamentalDispute.contractAddress,
            startBlock: goerliDeploys.AFundamentalDispute.blockNumber,
          },
          {
            name: "AFDRenderer",
            network: "goerli",
            abi: "./node_modules/@web3-scaffold/contracts/abi/AFDRenderer.sol/AFDRenderer.abi.json",
            address: goerliDeploys.AFDRenderer.contractAddress,
            startBlock: goerliDeploys.AFDRenderer.blockNumber,
          },
        ];
      default:
        throw new Error(`Unsupported chain ID: ${process.env.CHAIN_ID}`);
    }
  })(),
};
