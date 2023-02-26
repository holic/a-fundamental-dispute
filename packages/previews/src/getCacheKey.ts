export const getCacheKey = (
  rendererAddress: string,
  tokenId: number,
  seed: number
) => `${rendererAddress.toLowerCase()}/${tokenId}/${seed}`;
