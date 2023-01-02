import {
  ConsecutiveTransferHandler,
  Context,
  TransferHandler,
} from "../generated/handlers";

const htmlForToken = async (
  context: Context,
  blockNumber: number,
  tokenId: number
) => {
  const tokenURI = await context.contracts.AFundamentalDispute.tokenURI(
    BigInt(tokenId),
    {
      blockTag: blockNumber,
    }
  );

  if (tokenURI.startsWith("data:application/json,")) {
    const decodedUri = decodeURIComponent(
      tokenURI.replace(/^data:application\/json,/, "")
    );
    const json = JSON.parse(decodedUri);
    const animationUrl = json.animation_url;
    if (animationUrl.startsWith("data:text/html,")) {
      const decodedHtml = decodeURIComponent(
        animationUrl.replace(/^data:text\/html,/, "")
      );
      return decodedHtml;
    }

    console.error(
      "Unsupported animation_url format for token #",
      tokenId,
      animationUrl
    );
    throw new Error(`Unsupported animation_url format for token #${tokenId}`);
  }

  console.error("Unsupported tokenURI format for token #", tokenId, tokenURI);
  throw new Error(`Unsupported tokenURI format for token #${tokenId}`);
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
    const html = await htmlForToken(context, event.blockNumber, tokenId);
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
  const html = await htmlForToken(context, event.blockNumber, tokenId);
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
