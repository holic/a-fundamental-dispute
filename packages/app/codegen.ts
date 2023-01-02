import { CodegenConfig } from "@graphql-codegen/cli";

// TODO: update to prod once its finalized/deployed
export const graphUrl =
  process.env.NODE_ENV === "production"
    ? "https://afd-ponder-goerli.onrender.com/graphql"
    : "http://localhost:42069/graphql";

const config: CodegenConfig = {
  schema: graphUrl,
  documents: "src/**/*.{ts,tsx,graphql}",
  ignoreNoDocuments: true,

  generates: {
    "./codegen/indexer.ts": {
      plugins: [
        "@graphql-codegen/typescript",
        "@graphql-codegen/typescript-operations",
        "@graphql-codegen/typescript-urql",
      ],
      config: {
        gqlImport: "urql#gql",
        immutableTypes: true,
      },
    },
  },
  hooks: {
    afterAllFileWrite: ["eslint --fix"],
  },
};

export default config;
