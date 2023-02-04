import { contracts } from "./contracts";

export const previewImageUrl = (tokenId: number) =>
  `https://nyc3.digitaloceanspaces.com/afd-images/${contracts.AFDRenderer.address}/${tokenId}.jpg`;
