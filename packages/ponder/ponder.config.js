const { graphqlPlugin } = require("@ponder/graphql");

/**
 * @type {import('@ponder/core').PonderConfig}
 */
const ponderConfig = {
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
  sources: [
    {
      name: "FoldedFaces",
      network: "mainnet",
      abi: "./abis/FoldedFaces.json",
      address: "0xf01dfac37dd149cb686e05d06cd21930b011f10f",
      startBlock: 14837058,
    },
  ],
};

module.exports = ponderConfig;
