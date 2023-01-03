import type { NextPage } from "next";
import Head from "next/head";

const AboutPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>About &mdash; A Fundamental Dispute</title>

        <meta
          property="og:image"
          content={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/thumbnail-2.jpg`}
        />
        <meta property="og:image:width" content="654" />
        <meta property="og:image:height" content="900" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@generativelight" />
      </Head>
      {/* TODO: https://genlight.art/#wipwriteup */}
    </>
  );
};

export default AboutPage;
