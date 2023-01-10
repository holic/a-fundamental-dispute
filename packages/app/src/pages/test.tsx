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
      <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-[8vw] p-[8vw]">
        {tokenIds.map((tokenId) => (
          <div
            key={tokenId}
            className="block w-full aspect-[400/550] relative hover:scale-110 transition duration-500 text-stone-500 hover:text-stone-300"
          >
            <img
              src={`https://nyc3.digitaloceanspaces.com/afd-images/test/${tokenId}.jpg`}
              loading="lazy"
            />
            <span className="absolute bottom-full right-0 text-sm leading-relaxed">
              {tokenId}/{maxSupply}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default TestPage;
