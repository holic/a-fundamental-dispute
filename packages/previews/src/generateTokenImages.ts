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
  for (const token of tokens) {
    await createImage(
      `${goerliDeploys.AFDRenderer.contractAddress}/${token.tokenId}.png`,
      token.html
    );
  }
};

generateImages();
