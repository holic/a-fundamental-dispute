import { createImage } from "./createImage";
import { hasImage } from "./hasImage";

export const generateImages = async (
  graphUrl: string,
  rendererAddress: string
) => {
  console.log("fetching token seeds");
  const { data: allTokens } = await fetch(graphUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query {
          tokens: aFundamentalDisputeTokens(orderBy: "tokenId") {
            tokenId
            seed
          }
        }
      `,
    }),
  }).then((res) => res.json() as any);

  console.log("finding tokens without images");
  const tokensToGenerate = (
    await Promise.all(
      allTokens.tokens.map(async (token: any) => [
        token.tokenId,
        await hasImage(rendererAddress, token.tokenId, token.seed),
      ])
    )
  )
    .filter(([, hasImage]) => !hasImage)
    .map(([tokenId]) => tokenId);

  if (!tokensToGenerate.length) {
    console.log("no new tokens");
    return;
  }

  console.log("getting token html for", tokensToGenerate);
  const json = await fetch(graphUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query($tokens: [Int!]!) {
          tokens: aFundamentalDisputeTokens(where: { tokenId_in: $tokens }) {
            tokenId
            seed
            html
          }
        }
      `,
      variables: {
        tokens: tokensToGenerate,
      },
    }),
  }).then((res) => {
    console.log(res.status);
    return res.json() as any;
  });

  console.log(json.data);

  const tokens = json.data.tokens;
  const batchSize = 8;

  for (let i = 0; i < tokens.length; i += batchSize) {
    await Promise.all(
      tokens
        .slice(i, i + batchSize)
        .map((token: any) =>
          createImage(rendererAddress, token.tokenId, token.seed, token.html)
        )
    );
  }

  console.log("done");
};
