import { NextApiHandler } from "next";

import { createImage } from "@/createImage";

type ResponseData =
  | {
      png: string;
      jpg: string;
    }
  | { error: string };

const handler: NextApiHandler<ResponseData> = async (req, res) => {
  const html = (req.body.html || req.query.html) as string | undefined;
  if (typeof html !== "string" || !html) {
    res.status(400).json({ error: "Missing html" });
    return;
  }
  if (!html.includes("window.renderComplete = true")) {
    res.status(400).json({ error: "Unexpected html" });
    return;
  }

  try {
    const { png, jpg } = await createImage(html);
    res.status(200).json({
      png: Buffer.from(png).toString("base64"),
      jpg: Buffer.from(jpg).toString("base64"),
    });
  } catch (error: any) {
    console.error("Error rendering", error);
    res.status(500).json({ error: error.toString() });
  }
};

export default handler;
