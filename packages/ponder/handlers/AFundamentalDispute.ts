import {
  ConsecutiveTransferHandler,
  Context,
  TransferHandler,
} from "../generated/handlers";

const htmlForToken = async (context: Context, tokenId: number) => {
  // TODO: add support for renderer upgrades
  return await context.contracts.AFDRenderer.fullscreenHtml(BigInt(tokenId), {
    blockTag: 8246231,
  });
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
    const html = await htmlForToken(context, tokenId);
    await AFundamentalDisputeToken.upsert(tokenId.toString(), {
      tokenId,
      owner,
      html,
    });
  }
};

const handleTransfer: TransferHandler = async (event, context) => {
  const { AFundamentalDisputeToken, Wallet } = context.entities;

  const owner = event.params.to;
  await Wallet.upsert(owner, {});

  const tokenId = event.params.tokenId.toNumber();
  const html = await htmlForToken(context, tokenId);
  await AFundamentalDisputeToken.upsert(tokenId.toString(), {
    tokenId,
    owner,
    html,
  });
};

export const AFundamentalDispute = {
  ConsecutiveTransfer: handleConsecutiveTransfer,
  Transfer: handleTransfer,
};
