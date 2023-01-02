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
      </Head>
      <Gallery tokenIds={data?.tokens.map((token) => token.tokenId) ?? []} />
    </>
  );
};

export default GalleryPage;
