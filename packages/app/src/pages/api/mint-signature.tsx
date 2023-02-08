import { ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const signer = new ethers.Wallet(process.env.SHARED_SIGNER_PRIVATE_KEY!);

  const address = req.body.address as string;
  if (!address) {
    res.status(400).send({ error: "missing address" });
  }

  const encoded = ethers.utils.arrayify(
    ethers.utils.defaultAbiCoder.encode(["address"], [address])
  );

  res.json({
    signature: await signer.signMessage(encoded),
  });
};

export default handler;
