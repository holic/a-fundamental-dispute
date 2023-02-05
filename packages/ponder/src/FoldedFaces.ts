import { ponder } from "../generated";

ponder.on("FoldedFaces:Transfer", async ({ event, context }) => {
  const { FoldedFacesToken, Wallet } = context.entities;

  await Wallet.upsert(event.params.to, {});

  const foldedFaces = await FoldedFacesToken.get(
    event.params.tokenId.toString()
  );
  if (foldedFaces) {
    await FoldedFacesToken.update(event.params.tokenId.toString(), {
      owner: event.params.to,
    });
  } else {
    await FoldedFacesToken.insert(event.params.tokenId.toString(), {
      tokenId: event.params.tokenId.toNumber(),
      ownerAddress: event.params.to,
      owner: event.params.to,
      mintDiscountUsed: false,
    });
  }
});
