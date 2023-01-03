import { ethers } from "ethers";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { holderPrice, maxSupply, publicPrice } from "../constants";
import { MintButton } from "../MintButton";
import { TextLink } from "../TextLink";
import { useTotalMinted } from "../useTotalMinted";

const HomePage: NextPage = () => {
  const totalMinted = useTotalMinted();
  return (
    <>
      <Head>
        <title>A Fundamental Dispute</title>

        <meta
          name="description"
          content="— a long-form generative art collection using p5.js, made fully on-chain with EthFS."
        />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="A Fundamental Dispute" />
        <meta
          property="og:description"
          content="— a long-form generative art collection using p5.js, made fully on-chain with EthFS."
        />

        <meta
          property="og:image"
          content={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/thumbnail-2.jpg`}
        />
        <meta property="og:image:width" content="654" />
        <meta property="og:image:height" content="900" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@generativelight" />
      </Head>
      <div className="space-y-16 px-8 py-12 sm:px-12 sm:py-16 md:px-16 md:py-20 lg:px-20 lg:py-24 max-w-4xl">
        <div className="space-y-8">
          <div>
            <h1 className="text-lg font-bold text-white">
              A Fundamental Dispute
            </h1>
            <p className="italic">
              &mdash; a long-form generative art collection using{" "}
              <TextLink href="https://p5js.org/" target="_blank">
                p5.js
              </TextLink>
              , made <span className="whitespace-nowrap">fully on-chain</span>{" "}
              <span className="whitespace-nowrap">
                with{" "}
                <TextLink href="https://ethfs.xyz/" target="_blank">
                  EthFS
                </TextLink>
                .
              </span>
            </p>
          </div>

          <p>
            Art by{" "}
            <TextLink href="https://genlight.art/" target="_blank">
              Adam
            </TextLink>
            , website and contracts{" "}
            <span className="whitespace-nowrap">
              by{" "}
              <TextLink href="https://twitter.com/frolic" target="_blank">
                frolic
              </TextLink>
              .
            </span>
          </p>

          <hr className="border-1 border-stone-800" />

          {totalMinted?.lt(maxSupply) ? (
            <div>
              <MintButton />
              <p className="italic">
                {ethers.BigNumber.from(maxSupply).sub(totalMinted).toString()}{" "}
                of {maxSupply} pieces remaining.
              </p>
              <p className="italic text-sm opacity-60">
                <span className="font-sans text-xs font-bold">Ξ</span>
                {publicPrice} per piece,{" "}
                <span className="font-sans text-xs font-bold">Ξ</span>
                {holderPrice} for{" "}
                <TextLink
                  href="https://opensea.io/collection/foldedfaces"
                  target="_blank"
                >
                  Folded Faces
                </TextLink>{" "}
                holders.
              </p>
            </div>
          ) : null}

          <div>
            <p>
              <TextLink href="#">Learn about the collection ⇒</TextLink>
            </p>
            <p>
              <Link href="/art" passHref>
                <TextLink>View the gallery ⇒</TextLink>
              </Link>
            </p>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
          <img src="/thumbnail-1.jpg" />
          <img src="/thumbnail-2.jpg" />
          <img src="/thumbnail-3.jpg" />
          <img src="/thumbnail-4.jpg" />
        </div>
      </div>
    </>
  );
};

export default HomePage;
