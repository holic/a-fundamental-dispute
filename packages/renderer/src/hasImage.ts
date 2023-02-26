import { HeadObjectCommand, NotFound } from "@aws-sdk/client-s3";

import { getCacheKey } from "./getCacheKey";
import { s3Client } from "./s3Client";

export const hasImage = async (
  rendererAddress: string,
  tokenId: number,
  seed: number
) => {
  const cacheKey = getCacheKey(rendererAddress, tokenId, seed);

  try {
    await Promise.all([
      s3Client.send(
        new HeadObjectCommand({
          Bucket: "afd-images",
          Key: `${cacheKey}.png`,
        })
      ),
      s3Client.send(
        new HeadObjectCommand({
          Bucket: "afd-images",
          Key: `${cacheKey}.jpg`,
        })
      ),
    ]);
    console.log("images exist, skipping", cacheKey);
    return true;
  } catch (error: any) {
    if (error instanceof NotFound) {
      // console.log("one or more images not found, regenerating", cacheKey);
      return false;
    } else {
      throw error;
    }
  }
};
