import type { NextApiRequest, NextApiResponse } from "next";

import { rendererContract } from "../../../contracts";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const apiUrl = process.env.PREVIEW_API_URL;
  if (!apiUrl) {
    throw new Error("Missing PREVIEW_API_URL env var");
  }

  const tokenId = parseInt(req.query.tokenId as string);
  if (!tokenId) {
    throw new Error("Invalid token ID");
  }

  const html = await rendererContract.fullscreenHtml(tokenId);

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ html }),
  });

  if (!response.ok) {
    console.error(
      `Failed to generate preview for token ${tokenId}, bad response`,
      response.status
    );
    throw new Error(`Failed to generate preview for token ${tokenId}`);
  }
  if (response.headers.get("Content-Type") !== "image/png") {
    console.error(
      `Failed to generate preview for token ${tokenId}, response was not an image`,
      await response.text()
    );
    throw new Error(`Failed to generate preview for token ${tokenId}`);
  }

  console.log(
    "got response",
    response.headers.get("Content-Type"),
    response.headers.get("Content-Length")
  );

  res.setHeader("Cache-Control", `s-maxage=${60 * 60 * 24}`);

  res.setHeader("Content-Type", "image/png");
  res.send(Buffer.from(await response.arrayBuffer()));
};

export default handler;
