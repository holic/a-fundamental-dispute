import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { ArtPreview } from "../../ArtPreview";
import { firstParam } from "../../firstParam";

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
        <title>{`${tokenId}/218 &mdash; A Fundamental Dispute`}</title>
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center p-[8vw]">
        <div className="w-full max-w-[1000px] flex flex-col gap-2">
          <div className="flex justify-between gap-2">
            <div>A Fundamental Dispute</div>
            <div>{tokenId}/218</div>
          </div>
          <div className="aspect-[400/550]">
            {tokenId ? <ArtPreview tokenId={tokenId} /> : null}
          </div>
          {/* TODO: add opensea link */}
          {/* TODO: add owner name/link */}
        </div>
      </div>
    </>
  );
};

export default ArtPage;
