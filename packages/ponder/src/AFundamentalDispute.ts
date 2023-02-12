import { BigNumber } from "ethers";

import { ponder } from "../generated";

ponder.on(
  "AFundamentalDispute:ConsecutiveTransfer",
  async ({ event, context }) => {
    const { AFundamentalDisputeToken, Wallet } = context.entities;
    const { AFundamentalDispute, AFDRenderer } = context.contracts;

    const owner = event.params.to;
    await Wallet.upsert(owner, {});

    const fromId = event.params.fromTokenId.toNumber();
    const toId = event.params.toTokenId.toNumber();
    for (let tokenId = fromId; tokenId <= toId; tokenId++) {
      const seed = await AFundamentalDispute.tokenSeed(BigNumber.from(tokenId));
      const html = await AFDRenderer.fullscreenHtml(BigNumber.from(tokenId));
      await AFundamentalDisputeToken.upsert(tokenId.toString(), {
        tokenId,
        owner,
        seed,
        html,
      });
    }
  }
);

ponder.on("AFundamentalDispute:Transfer", async ({ event, context }) => {
  const { AFundamentalDisputeToken, Wallet } = context.entities;
  const { AFundamentalDispute, AFDRenderer } = context.contracts;

  const owner = event.params.to;
  await Wallet.upsert(owner, {});

  const tokenId = event.params.tokenId.toNumber();
  if (await AFundamentalDisputeToken.get(tokenId.toString())) {
    await AFundamentalDisputeToken.update(tokenId.toString(), {
      owner,
    });
    return;
  }

  const seed = await AFundamentalDispute.tokenSeed(BigNumber.from(tokenId));
  const html = await AFDRenderer.fullscreenHtml(BigNumber.from(tokenId));
  await AFundamentalDisputeToken.insert(tokenId.toString(), {
    tokenId,
    owner,
    seed,
    html,
  });
});

ponder.on("AFundamentalDispute:MetadataUpdate", async ({ event, context }) => {
  const { AFundamentalDisputeToken } = context.entities;
  const { AFundamentalDispute, AFDRenderer } = context.contracts;

  const tokenId = event.params._tokenId.toNumber();
  const token = await AFundamentalDisputeToken.get(tokenId.toString());
  if (!token) {
    throw new Error(
      `Unexpected metadata update for non-existent token ${tokenId}`
    );
  }

  const seed = await AFundamentalDispute.tokenSeed(BigNumber.from(tokenId));
  if (seed !== token.seed) {
    const html = await AFDRenderer.fullscreenHtml(BigNumber.from(tokenId));
    await AFundamentalDisputeToken.update(tokenId.toString(), {
      seed,
      html,
    });
  }
});

ponder.on(
  "AFundamentalDispute:BatchMetadataUpdate",
  async ({ event, context }) => {
    const { AFundamentalDisputeToken } = context.entities;
    const { AFundamentalDispute, AFDRenderer } = context.contracts;

    const fromTokenId = event.params._fromTokenId.toNumber();
    const toTokenId = event.params._toTokenId.toNumber();

    for (let tokenId = fromTokenId; tokenId <= toTokenId; tokenId++) {
      const token = await AFundamentalDisputeToken.get(tokenId.toString());
      if (!token) {
        throw new Error(
          `Unexpected metadata update for non-existent token ${tokenId}`
        );
      }

      const seed = await AFundamentalDispute.tokenSeed(BigNumber.from(tokenId));
      if (seed !== token.seed) {
        const html = await AFDRenderer.fullscreenHtml(BigNumber.from(tokenId));
        await AFundamentalDisputeToken.update(tokenId.toString(), {
          seed,
          html,
        });
      }
    }
  }
);

ponder.on(
  "AFundamentalDispute:TokenDiscountUsed",
  async ({ event, context }) => {
    const { FoldedFacesToken } = context.entities;

    const tokenId = event.params.tokenId.toNumber();
    const token = await FoldedFacesToken.get(tokenId.toString());
    if (!token) {
      throw new Error(
        `Discount for Folded Faces #${tokenId} used before the token was created?`
      );
    }

    await FoldedFacesToken.update(tokenId.toString(), {
      mintDiscountUsed: true,
    });
  }
);
