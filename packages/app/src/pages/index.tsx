import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { MintButton } from "../MintButton";
import { TextLink } from "../TextLink";

const HomePage: NextPage = () => (
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

        <div>
          <MintButton />
          <p className="italic">218 of 218 pieces remaining.</p>
        </div>

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

export default HomePage;
