import { PutObjectCommand } from "@aws-sdk/client-s3";

import { s3Client } from "./s3Client";

export const storeImage = async (
  rendererAddress: string,
  tokenId: number,
  seed: number,
  png: string | Buffer,
  jpg: string | Buffer
) => {
  const cacheKey = `${rendererAddress}/${tokenId}/${seed}`;

  await Promise.all([
    s3Client.send(
      new PutObjectCommand({
        Bucket: "afd-images",
        Key: `${cacheKey}.png`,
        Body: png,
        ACL: "public-read",
        ContentType: "image/png",
      })
    ),
    s3Client.send(
      new PutObjectCommand({
        Bucket: "afd-images",
        Key: `${cacheKey}.jpg`,
        Body: jpg,
        ACL: "public-read",
        ContentType: "image/jpeg",
      })
    ),
  ]);

  console.log(
    "Stored image",
    `${cacheKey}.png`,
    `(${(png.length / 1024 / 1024).toPrecision(2)} mb)`
  );
  console.log(
    "Stored image",
    `${cacheKey}.jpg`,
    `(${(jpg.length / 1024 / 1024).toPrecision(2)} mb)`
  );
};
