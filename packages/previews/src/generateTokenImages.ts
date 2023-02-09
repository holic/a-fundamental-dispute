import mainnetDeploys from "@web3-scaffold/contracts/deploys/mainnet.json";
import fetch from "node-fetch";

import { createImage } from "./createImage";

export const generateImages = async () => {
  const json = await fetch("https://afd-ponder.up.railway.app/graphql", {
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
      tokens
        .slice(i, i + batchSize)
        .map((token: any) =>
          createImage(
            `${mainnetDeploys.AFDRenderer.contractAddress}/${token.tokenId}`,
            token.html
          )
        )
    );
  }

  console.log("done");
};

generateImages();
