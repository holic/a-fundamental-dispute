import { BigNumber } from "ethers";

import {
  ConsecutiveTransferHandler,
  Context,
  TokenDiscountUsedHandler,
  TransferHandler,
} from "../generated/handlers";

const htmlForToken = async (context: Context, tokenId: number) => {
  // TODO: add support for renderer upgrades
  return await context.contracts.AFDRenderer.fullscreenHtml(
    BigNumber.from(tokenId)
  );
};

const seedForToken = async (context: Context, tokenId: number) => {
  // TODO: add support for renderer upgrades
  // TODO: remove /2 once the contract has it
  return Math.floor(
    (await context.contracts.AFDRenderer.seedOf(BigNumber.from(tokenId))) / 2
  );
};

const handleConsecutiveTransfer: ConsecutiveTransferHandler = async (
  event,
  context
) => {
  const { AFundamentalDisputeToken, Wallet } = context.entities;

  const owner = event.params.to;
  await Wallet.upsert(owner, {});

  const fromId = event.params.fromTokenId.toNumber();
  const toId = event.params.toTokenId.toNumber();
  for (let tokenId = fromId; tokenId <= toId; tokenId++) {
    const seed = await seedForToken(context, tokenId);
    const html = await htmlForToken(context, tokenId);
    await AFundamentalDisputeToken.upsert(tokenId.toString(), {
      tokenId,
      ownerAddress: owner,
      owner,
      seed,
      html,
    });
  }
};

const handleTransfer: TransferHandler = async (event, context) => {
  const { AFundamentalDisputeToken, Wallet } = context.entities;

  const owner = event.params.to;
  await Wallet.upsert(owner, {});

  const tokenId = event.params.tokenId.toNumber();
  const seed = await seedForToken(context, tokenId);
  const html = await htmlForToken(context, tokenId);
  await AFundamentalDisputeToken.upsert(tokenId.toString(), {
    tokenId,
    ownerAddress: owner,
    owner,
    seed,
    html,
  });
};

const handleTokenDiscountUsed: TokenDiscountUsedHandler = async (
  event,
  context
) => {
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
};

export const AFundamentalDispute = {
  ConsecutiveTransfer: handleConsecutiveTransfer,
  TokenDiscountUsed: handleTokenDiscountUsed,
  Transfer: handleTransfer,
};
