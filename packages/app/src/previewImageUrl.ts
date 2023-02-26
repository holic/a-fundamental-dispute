import { contracts } from "./contracts";

export const previewImageUrl = (tokenId: number, seed: number) =>
  `https://nyc3.digitaloceanspaces.com/afd-images/${contracts.AFDRenderer.address.toLowerCase()}/${tokenId}/${seed}.jpg`;
