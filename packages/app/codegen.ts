import { CodegenConfig } from "@graphql-codegen/cli";

export const graphUrl = process.env.NEXT_PUBLIC_GRAPH_URL;

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
