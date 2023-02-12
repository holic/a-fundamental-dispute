import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { gql } from "urql";

import {
  ArtPlaceholderQuery,
  ArtPlaceholderQueryVariables,
} from "../../../../codegen/indexer";
import { maxSupply } from "../../../constants";
import { previewImageUrl } from "../../../previewImageUrl";
import { graphClient } from "../../_app";

const bg = fs.readFileSync(
  path.join(process.cwd(), "public/art-placeholder-bg.jpg")
);

const artPlaceholderQuery = gql`
  query ArtPlaceholder($id: ID!) {
    token: aFundamentalDisputeToken(id: $id) {
      tokenId
      seed
    }
  }
`;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const tokenId = parseInt(req.query.tokenId as string);
  if (!tokenId || tokenId < 1 || tokenId > maxSupply) {
    res.status(400).send("Invalid token ID");
    return;
  }

  const result = await graphClient
    .query<ArtPlaceholderQuery, ArtPlaceholderQueryVariables>(
      artPlaceholderQuery,
      { id: tokenId.toString() }
    )
    .toPromise();

  const token = result.data?.token;
  if (token) {
    const imageUrl = previewImageUrl(token.tokenId, token.seed);
    const imageResponse = await fetch(imageUrl, { method: "HEAD" });
    if (imageResponse.status === 200) {
      return res.redirect(302, imageUrl);
    }
  }

  console.log("Showing placeholder for token ID", tokenId);

  res.status(200).setHeader("Content-Type", "image/svg+xml").send(`
    <svg width="800" height="1100" viewBox="0 0 400 550" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" font-family="Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif" fill="#fff">
      <image href="data:image/jpeg;base64,${bg.toString(
        "base64"
      )}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
      <rect width="100%" height="100%" fill="#000" opacity="30%" />
      <text x="50%" y="40%" text-anchor="middle" dominant-baseline="middle" font-size="16px" style="text-shadow: 0 2px 2px #333">
        <tspan x="50%" font-size="28px" font-weight="bold">A Fundamental Dispute
        </tspan>
        <tspan x="50%" dy="1.5em" font-size="20px">${tokenId}/${maxSupply}</tspan>
        <tspan x="50%" dy="8em" font-style="italic">Still rendering…</tspan>
        <tspan x="50%" dy="1.25em" font-style="italic">
          View your piece at <tspan font-weight="bold">afundamentaldispute.com</tspan>
        </tspan>
      </text>
    </svg>
  `);
};

export default handler;
