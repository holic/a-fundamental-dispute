import type { NextApiRequest, NextApiResponse } from "next";

import { rendererContract } from "../../../contracts";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const apiUrl = process.env.PREVIEW_API_URL;
  if (!apiUrl) {
    throw new Error("Missing PREVIEW_API_URL env var");
  }
  const sharedSecret = process.env.PREVIEW_API_SHARED_SECRET;
  if (!sharedSecret) {
    throw new Error("Missing PREVIEW_API_SHARED_SECRET env var");
  }

  const tokenId = parseInt(req.query.tokenId as string);
  if (!tokenId) {
    throw new Error("Invalid token ID");
  }

  const html = await rendererContract.fullscreenHtml(tokenId);

  const response = await Promise.race([
    await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sharedSecret,
        cacheKey: `${rendererContract.address}/${tokenId}.png`,
        html,
      }),
    }),
    new Promise((, reject) => reject(new Error("timeout")))),
  ]);

  // timeout
  if (response === false) {
    console.log("redirecting to", req.url);
    res.redirect(req.url!);
    return;
  }

  if (response)
    if (!response.ok) {
      console.error(
        `Failed to generate preview for token ${tokenId}, bad response`,
        response.status
      );
      throw new Error(`Failed to generate preview for token ${tokenId}`);
    }
  const json = await response.json();
  if (!json.imageUrl) {
    console.error(`Failed to generate preview for token ${tokenId}`, json);
    throw new Error(`Failed to generate preview for token ${tokenId}`);
  }
  console.log("got json", json);

  res.redirect(json.imageUrl);
  // console.log(
  //   "got response",
  //   response.headers.get("Content-Type"),
  //   response.headers.get("Content-Length")
  // );

  // res.setHeader("Cache-Control", `s-maxage=${60 * 60 * 24}`);

  // res.setHeader("Content-Type", "image/png");
  // res.send(Buffer.from(await response.arrayBuffer()));
};

export default handler;
