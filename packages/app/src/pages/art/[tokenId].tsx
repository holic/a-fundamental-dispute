import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { ArtPreview } from "../../ArtPreview";
import { maxSupply } from "../../constants";
import { contracts } from "../../contracts";
import { targetChainId } from "../../EthereumProviders";
import { firstParam } from "../../firstParam";
import { TextLink } from "../../TextLink";
import { TokenOwner } from "../../TokenOwner";
import { TopBar } from "../../TopBar";

// TODO: validate tokenId param within range
// TODO: generate static paths

const ArtPage: NextPage = () => {
  const router = useRouter();
  const tokenIdParam = firstParam(router.query.tokenId);
  const tokenId = tokenIdParam ? parseInt(tokenIdParam) ?? null : null;
  if (!tokenId) return null;

  return (
    <>
      <Head>
        {/* Using string interpolation here because Next.js complains if <title> has multiple children/nodes */}
        <title>{`${tokenId}/${maxSupply} — A Fundamental Dispute`}</title>
      </Head>
      <TopBar />
      <div className="min-h-screen flex flex-col items-center justify-center p-[8vw]">
        <div className="w-full max-w-[1000px] flex flex-col gap-2">
          <div className="flex justify-end">
            {tokenId}/{maxSupply}
          </div>
          <div className="aspect-[400/550] relative">
            {tokenId ? <ArtPreview tokenId={tokenId} /> : null}
          </div>
          <div className="flex justify-between">
            <span>
              Owned by <TokenOwner tokenId={tokenId} />
            </span>
            <span>
              <TextLink
                href={
                  targetChainId === 1
                    ? `https://opensea.io/assets/ethereum/${contracts.AFundamentalDispute.address}/${tokenId}`
                    : `https://testnets.opensea.io/assets/goerli/${contracts.AFundamentalDispute.address}/${tokenId}`
                }
                target="_blank"
              >
                View on OpenSea ⇒
              </TextLink>
            </span>
          </div>
          {/* TODO: add opensea link */}
          {/* TODO: add owner name/link */}
        </div>
      </div>
    </>
  );
};

export default ArtPage;
