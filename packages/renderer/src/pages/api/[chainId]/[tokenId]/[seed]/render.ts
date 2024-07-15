import mainnetDeploys from "@web3-scaffold/contracts/deploys/mainnet.json";
import { NextApiHandler } from "next";
import { createPublicClient, Hex, http } from "viem";

import { queueImage } from "@/queueImage";

const abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "fullscreenHtml",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const handler: NextApiHandler = async (req, res) => {
  const chainId = parseInt(req.query.chainId as string);
  const tokenId = BigInt(req.query.tokenId as string);
  const seed = parseInt(req.query.seed as string);

  // TODO: support other chains?
  const publicClient = createPublicClient({
    transport: http(process.env.PONDER_RPC_URL_1!),
  });

  try {
    const html = await publicClient.readContract({
      address: mainnetDeploys.AFDRenderer.contractAddress as Hex,
      abi,
      functionName: "fullscreenHtml",
      // TODO: add support for tokenId+seed look ups
      args: [tokenId],
    });
    const { png, jpg } = await queueImage(html);
    res
      .status(200)
      .setHeader("Content-Type", "image/png")
      .setHeader(
        "CDN-Cache-Control",
        `s-maxage=${60 * 60 * 24}, stale-while-revalidate`
      )
      .send(jpg);
  } catch (error: any) {
    console.error("Error rendering", error);
    res.status(500).json({ error: error.toString() });
  }
};

export default handler;
