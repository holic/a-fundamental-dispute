import { ponder } from "../generated";

ponder.on("FoldedFaces:Transfer", async ({ event, context }) => {
  const { FoldedFacesToken, Wallet } = context.entities;

  await Wallet.upsert({ id: event.params.to });

  await FoldedFacesToken.upsert({
    id: event.params.tokenId,
    create: {
      tokenId: event.params.tokenId,
      owner: event.params.to,
      mintDiscountUsed: false,
    },
    update: {
      owner: event.params.to,
    },
  });
});
