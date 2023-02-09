import type { NextPage } from "next";
import Head from "next/head";

const DisputePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dispute</title>
      </Head>
      <div className="space-y-16 px-8 py-12 sm:px-12 sm:py-16 md:px-16 md:py-20 lg:px-20 lg:py-24 max-w-4xl">
        <div className="space-y-8">
          <p>Now is not the time…</p>
        </div>
      </div>
    </>
  );
};

export default DisputePage;
