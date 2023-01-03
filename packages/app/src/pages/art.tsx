import type { NextPage } from "next";
import Head from "next/head";
import { gql } from "urql";

import { useGalleryPageQuery } from "../../codegen/indexer";
import { Gallery } from "../Gallery";

gql`
  query GalleryPage {
    tokens: aFundamentalDisputeTokens {
      id
      tokenId
    }
  }
`;

const GalleryPage: NextPage = () => {
  const [{ data }] = useGalleryPageQuery();

  return (
    <>
      <Head>
        <title>Gallery &mdash; A Fundamental Dispute</title>

        <meta
          property="og:image"
          content={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/thumbnail-2.jpg`}
        />
        <meta property="og:image:width" content="654" />
        <meta property="og:image:height" content="900" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@generativelight" />
      </Head>
      <Gallery tokenIds={data?.tokens.map((token) => token.tokenId) ?? []} />
    </>
  );
};

export default GalleryPage;
