import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { ArtPreview } from "../../ArtPreview";

const ArtPage: NextPage = () => {
  const router = useRouter();
  const tokenId = parseInt(router.query.tokenId as string);
  return (
    <>
      <Head>
        <title>{tokenId}/218 &mdash; A Fundamental Dispute</title>
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center p-[8vw]">
        <div className="w-full max-w-[1000px] flex flex-col gap-2">
          <div className="flex justify-between gap-2">
            <div>A Fundamental Dispute</div>
            <div>{tokenId}/218</div>
          </div>
          <div className="aspect-[400/550]">
            <ArtPreview tokenId={tokenId} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtPage;
