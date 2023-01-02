import { TransferHandler } from "../generated/handlers";

const handleTransfer: TransferHandler = async (event, context) => {
  const { FoldedFacesToken, Wallet } = context.entities;

  await Wallet.upsert(event.params.to, {});
  await FoldedFacesToken.upsert(event.params.tokenId.toString(), {
    tokenId: event.params.tokenId.toNumber(),
    owner: event.params.to,
  });
};

export const FoldedFaces = {
  Transfer: handleTransfer,
};
