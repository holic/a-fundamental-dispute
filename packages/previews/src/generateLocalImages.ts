import goerliDeploys from "@web3-scaffold/contracts/deploys/goerli.json";
import fetch from "node-fetch";

import { createImage } from "./createImage";

export const generateImages = async () => {
  const json = await fetch("http://localhost:42069/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query {
          tokens: aFundamentalDisputeTokens {
            tokenId
            seed
            html
          }
        }
      `,
    }),
  }).then((res) => res.json() as any);

  const tokens = json.data.tokens;
  const batchSize = 8;

  // TODO: filter out already rendered images

  for (let i = 0; i < tokens.length; i += batchSize) {
    await Promise.all(
      tokens.slice(i, i + batchSize).map((token: any) =>
        createImage(
          goerliDeploys.AFDRenderer.contractAddress,
          token.tokenId,
          token.seed,
          token.html
          // `https://testnets-api.opensea.io/api/v1/asset/${goerliDeploys.AFundamentalDispute.contractAddress}/${token.tokenId}/?force_update=true`
        )
      )
    );
  }

  console.log("done");
};

generateImages();
