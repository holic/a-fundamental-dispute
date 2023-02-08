import { ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const signer = new ethers.Wallet(process.env.SHARED_SIGNER_PRIVATE_KEY!);

  const address = req.body.address as string;
  if (!address) {
    return res.status(400).send({ error: "missing address" });
  }

  const turnstileToken = req.body.turnstileToken as string;
  if (!turnstileToken) {
    return res.status(400).send({ error: "missing turnstileToken" });
  }

  const verifyResult = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY!,
        response: turnstileToken,
      }),
    }
  ).then((res) => res.json());

  if (!verifyResult.success) {
    return res.status(400).send({
      error:
        verifyResult["error-codes"].join(", ") ||
        "could not verify turnstile token",
    });
  }

  if (address !== verifyResult.cdata) {
    return res.status(400).send({
      error: "cdata address does not match",
    });
  }

  const encoded = ethers.utils.arrayify(
    ethers.utils.defaultAbiCoder.encode(["address"], [address])
  );

  return res.json({
    signature: await signer.signMessage(encoded),
  });
};

export default handler;
