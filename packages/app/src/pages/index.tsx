import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

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
    <div className="space-y-16 p-20 max-w-4xl">
      <div className="space-y-8">
        <div>
          <h1 className="text-lg font-bold text-white">
            A Fundamental Dispute
          </h1>
          <p className="italic">
            &mdash; a long-form generative art collection using{" "}
            <a
              href="https://p5js.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-stone-300 hover:text-white"
            >
              p5.js
            </a>
            , made fully on-chain with{" "}
            <a
              href="https://ethfs.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-stone-300 hover:text-white"
            >
              EthFS
            </a>
            .
          </p>
        </div>

        <p>
          Art by{" "}
          <a href="#" className="underline text-stone-300 hover:text-white">
            Adam
          </a>
          , website and contracts by{" "}
          <a href="#" className="underline text-stone-200 hover:text-white">
            frolic
          </a>
          .
        </p>

        <hr className="border-1 border-stone-800" />

        <div>
          <button
            type="button"
            className="underline text-stone-200 hover:text-white"
          >
            Mint a piece
          </button>
          <p className="italic">218 of 218 pieces remaining</p>
        </div>

        <div>
          <p>
            <a href="#" className="underline text-stone-200 hover:text-white">
              Learn about the collection
            </a>
          </p>
          <p>
            <Link href="/art" passHref>
              <a className="underline text-stone-200 hover:text-white">
                View the gallery
              </a>
            </Link>
          </p>
        </div>
      </div>

      <div className="w-full grid grid-cols-4 gap-4">
        <img src="/thumbnail-1.jpg" />
        <img src="/thumbnail-2.jpg" />
        <img src="/thumbnail-3.jpg" />
        <img src="/thumbnail-4.jpg" />
      </div>
    </div>
  </>
);

export default HomePage;
