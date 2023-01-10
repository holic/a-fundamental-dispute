import type { NextPage } from "next";
import Head from "next/head";

import { maxSupply } from "../constants";

const TestPage: NextPage = () => {
  const tokenIds = new Array(maxSupply).fill(0).map((_, i) => i + 1);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="w-full grid grid-cols-10 gap-2 p-2">
        {tokenIds.map((tokenId) => (
          <div key={tokenId} className="block w-full aspect-[400/550]">
            <img
              src={`https://nyc3.digitaloceanspaces.com/afd-images/test/${tokenId}.jpg`}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default TestPage;
