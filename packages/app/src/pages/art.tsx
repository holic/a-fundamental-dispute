import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { gql } from "urql";

import {
  GalleryPageQuery,
  GalleryPageQueryVariables,
} from "../../codegen/indexer";
import { Gallery } from "../Gallery";
import { TopBar } from "../TopBar";
import { graphClient } from "./_app";

const galleryPageQuery = gql`
  query GalleryPage {
    tokens: aFundamentalDisputeTokens {
      id
      tokenId
    }
  }
`;

type Props = {
  tokenIds: number[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const res = await graphClient
    .query<GalleryPageQuery, GalleryPageQueryVariables>(galleryPageQuery)
    .toPromise();
  return {
    props: {
      tokenIds: res.data?.tokens.map((token) => token.tokenId) ?? [],
    },
  };
};

const GalleryPage: NextPage<Props> = ({ tokenIds }) => (
  <>
    <Head>
      <title>Gallery — A Fundamental Dispute</title>

      <meta
        property="og:image"
        content={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/thumbnail-2.jpg`}
      />
      <meta property="og:image:width" content="654" />
      <meta property="og:image:height" content="900" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@generativelight" />
    </Head>
    <TopBar />
    <Gallery tokenIds={tokenIds} />
  </>
);

export default GalleryPage;
