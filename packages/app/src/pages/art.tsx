import type { NextPage } from "next";
import Head from "next/head";

import { Gallery } from "../Gallery";

const GalleryPage: NextPage = () => (
  <>
    <Head>
      <title>Gallery &mdash; A Fundamental Dispute</title>
    </Head>
    <Gallery />
  </>
);

export default GalleryPage;
