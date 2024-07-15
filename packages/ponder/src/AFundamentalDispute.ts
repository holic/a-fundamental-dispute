import { ponder } from "../generated";

ponder.on(
  "AFundamentalDispute:ConsecutiveTransfer",
  async ({ event, context }) => {
    console.log("event:", event.name, event.block.number);

    const { AFundamentalDisputeToken, Wallet } = context.entities;
    const { AFundamentalDispute } = context.contracts;

    const owner = event.params.to;
    await Wallet.upsert({ id: owner });

    const fromId = event.params.fromTokenId;
    const toId = event.params.toTokenId;
    for (let tokenId = fromId; tokenId <= toId; tokenId++) {
      const seed = await AFundamentalDispute.read.tokenSeed([tokenId]);
      await AFundamentalDisputeToken.upsert({
        id: tokenId,
        create: { tokenId, owner, seed },
        update: { tokenId, owner, seed },
      });
    }
  }
);

ponder.on("AFundamentalDispute:Transfer", async ({ event, context }) => {
  console.log("event:", event.name, event.block.number);

  const { AFundamentalDisputeToken, Wallet } = context.entities;
  const { AFundamentalDispute } = context.contracts;

  const owner = event.params.to;
  await Wallet.upsert({ id: owner });

  const tokenId = event.params.tokenId;
  if (await AFundamentalDisputeToken.findUnique({ id: tokenId })) {
    await AFundamentalDisputeToken.update({
      id: tokenId,
      data: { owner },
    });
    return;
  }

  const seed = await AFundamentalDispute.read.tokenSeed([tokenId]);
  await AFundamentalDisputeToken.create({
    id: tokenId,
    data: { tokenId, owner, seed },
  });
});

ponder.on("AFundamentalDispute:MetadataUpdate", async ({ event, context }) => {
  console.log("event:", event.name, event.block.number);

  const { AFundamentalDisputeToken } = context.entities;
  const { AFundamentalDispute } = context.contracts;

  const tokenId = event.params._tokenId;
  const token = await AFundamentalDisputeToken.findUnique({ id: tokenId });
  if (!token) {
    throw new Error(
      `Unexpected metadata update for non-existent token ${tokenId}`
    );
  }

  const seed = await AFundamentalDispute.read.tokenSeed([tokenId]);
  if (seed !== token.seed) {
    await AFundamentalDisputeToken.update({
      id: tokenId,
      data: { seed },
    });
  }
});

ponder.on(
  "AFundamentalDispute:BatchMetadataUpdate",
  async ({ event, context }) => {
    console.log("event:", event.name, event.block.number);

    const { AFundamentalDisputeToken } = context.entities;
    const { AFundamentalDispute } = context.contracts;

    const fromTokenId = event.params._fromTokenId;
    const toTokenId = event.params._toTokenId;

    for (let tokenId = fromTokenId; tokenId <= toTokenId; tokenId++) {
      const token = await AFundamentalDisputeToken.findUnique({ id: tokenId });
      if (!token) {
        throw new Error(
          `Unexpected metadata update for non-existent token ${tokenId}`
        );
      }

      const seed = await AFundamentalDispute.read.tokenSeed([tokenId]);
      if (seed !== token.seed) {
        await AFundamentalDisputeToken.update({
          id: tokenId,
          data: { seed },
        });
      }
    }
  }
);

ponder.on(
  "AFundamentalDispute:TokenDiscountUsed",
  async ({ event, context }) => {
    console.log("event:", event.name, event.block.number);

    const { FoldedFacesToken } = context.entities;

    const tokenId = event.params.tokenId;
    const token = await FoldedFacesToken.findUnique({ id: tokenId });
    if (!token) {
      throw new Error(
        `Discount for Folded Faces #${tokenId} used before the token was created?`
      );
    }

    await FoldedFacesToken.update({
      id: tokenId,
      data: { mintDiscountUsed: true },
    });
  }
);
