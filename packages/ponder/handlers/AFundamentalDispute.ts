import {
  ConsecutiveTransferHandler,
  TransferHandler,
} from "../generated/handlers";

const handleConsecutiveTransfer: ConsecutiveTransferHandler = async (
  event,
  context
) => {
  const { AFundamentalDisputeToken, Wallet } = context.entities;

  await Wallet.upsert(event.params.to, {});

  const fromId = event.params.fromTokenId.toNumber();
  const toId = event.params.toTokenId.toNumber();
  for (let tokenId = fromId; tokenId <= toId; tokenId++) {
    await AFundamentalDisputeToken.upsert(tokenId.toString(), {
      tokenId: tokenId,
      owner: event.params.to,
    });
  }
};

const handleTransfer: TransferHandler = async (event, context) => {
  const { AFundamentalDisputeToken, Wallet } = context.entities;

  await Wallet.upsert(event.params.to, {});
  await AFundamentalDisputeToken.upsert(event.params.tokenId.toString(), {
    tokenId: event.params.tokenId.toNumber(),
    owner: event.params.to,
  });
};

export const AFundamentalDispute = {
  ConsecutiveTransfer: handleConsecutiveTransfer,
  Transfer: handleTransfer,
};
