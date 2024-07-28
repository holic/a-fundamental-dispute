import { targetChainId } from "./EthereumProviders";

export const previewImageUrl = (tokenId: number, seed: number) =>
  `https://afd-renderer.cache.frolic.digital/api/${targetChainId}/${tokenId}/${seed}`;
