const { graphqlPlugin } = require("@ponder/graphql");

/**
 * @type {import('@ponder/core').PonderConfig}
 */
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
        return [
          {
            name: "FoldedFaces",
            network: "mainnet",
            abi: "./abis/FoldedFaces.json",
            address: "0xf01dfac37dd149cb686e05d06cd21930b011f10f",
            startBlock: 14837058,
          },
        ];
      case "5":
        return [
          {
            name: "FoldedFaces",
            network: "mainnet",
            abi: "./abis/FoldedFaces.json",
            address: "0xf01dfac37dd149cb686e05d06cd21930b011f10f",
            startBlock: 14837058,
          },
          {
            name: "AFundamentalDispute",
            network: "goerli",
            abi: "../contracts/abi/AFD.sol/AFundamentalDispute.abi.json",
            address: "0xD8A6f1cB8a71721a81B589C953490d11DaCfaA9A",
            startBlock: 8242641,
          },
          {
            name: "AFDRenderer",
            network: "goerli",
            abi: "../contracts/abi/AFDRenderer.sol/AFDRenderer.abi.json",
            address: "0xf939B2b961D2fBDf62e247C48f038EfC7B87f0fF",
            startBlock: 8246231,
          },
        ];
      default:
        throw new Error(`Unsupported chain ID: ${process.env.CHAIN_ID}`);
    }
  })(),
};
