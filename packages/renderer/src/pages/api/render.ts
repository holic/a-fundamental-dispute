import { NextApiHandler } from "next";

import { hasImage } from "@/hasImage";
import { queueImage } from "@/queueImage";
import { storeImage } from "@/storeImage";

type ResponseData =
  | {
      status: string;
    }
  | { error: string };

const handler: NextApiHandler<ResponseData> = async (req, res) => {
  const { rendererAddress, tokenId, seed, html } = req.body;
  if (!rendererAddress || !tokenId || !seed || !html) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }
  if (!/A Fundamental Dispute/.test(html)) {
    res.status(400).json({ error: "Unexpected html" });
    return;
  }

  console.log("checking for image", rendererAddress, tokenId, seed);
  if (await hasImage(rendererAddress, tokenId, seed)) {
    console.log("has image, skipping", rendererAddress, tokenId, seed);
    res.status(200).json({ status: "exists" });
    return;
  }

  try {
    const { png, jpeg } = await queueImage(html);
    await storeImage(rendererAddress, tokenId, seed, png, jpeg);
    res.status(201).json({ status: "created" });
  } catch (error: any) {
    console.error("Error rendering", error);
    res.status(500).json({ error: error.toString() });
  }
};

export default handler;
