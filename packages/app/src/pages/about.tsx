import type { NextPage } from "next";
import Head from "next/head";

import { TextLink } from "../TextLink";
import { TopBar } from "../TopBar";

const AboutPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>About — A Fundamental Dispute</title>

        <meta property="og:type" content="website" />
        <meta property="og:title" content="About — A Fundamental Dispute" />
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
      <div className="space-y-16 px-8 py-12 sm:px-12 sm:py-16 md:px-16 md:py-20 lg:px-20 lg:py-24 max-w-4xl">
        <div className="space-y-12">
          <div className="space-y-8">
            <h1 className="text-lg font-bold text-white">From the artist</h1>
            <p className="max-w-prose">
              The title (A Fundamental Dispute) and number of pieces (436) are
              inspired by a line in the Talmud: Rabbi Meir&apos;s response is
              connected to the fundamental dispute over when night begins
              (2b18). When you look at your piece, I hope you feel a hint of
              what they felt&mdash;sincerity, curiosity, and gratitude for the
              world and its mysteries / wonders.
            </p>
            <p className="max-w-prose">
              It is not possible to sort or filter pieces based on traits (e.g.
              sun present, color of background, etc.). There are also no
              royalties taken on sales. Both of these are intentional. I find it
              strange that most generative art is viewed from the lens of
              metadata. Each piece is meant to be enjoyed
              holistically&mdash;like you would enjoy a real sunset. I also have
              no desire to make money on you reselling your piece. It&apos;s
              yours. Instead, we are withholding some pieces for ourselves that
              we might give away or sell at some point in the future.
            </p>
            <p className="max-w-prose">
              I&apos;ve been trying to learn to draw for as long as I can
              remember. Although I&apos;m perennially disappointed in the
              outputs, I have fond memories of graph paper and cross-hatching
              and wobbly lines. You&apos;ll find all of these in this
              collection.
            </p>
            <p className="max-w-prose">
              Every time you look at a sunset, sunrise, or sky filled with
              clouds, you&apos;re looking at something that will never exist
              again in precisely that way. AFD is the opposite&mdash;a chance or
              an attempt to &ldquo;capture a cloud.&rdquo; These pieces are
              stored on-chain, forever.
            </p>
            <p className="max-w-prose">
              As a kid I used to take long, long drives across Texas with my
              Dad. There wasn&apos;t much to see except cropland, woods, and
              clouds. Clouds were the star of all of my daydreams. Today I see
              them as a push for earnestness and a turn away from cynicism. You
              can go outside right now&mdash;wherever you might be&mdash;and see
              a beautiful sky. I&apos;m never disappointed to look up and I hope
              you feel the same.
            </p>
            <p className="max-w-prose">
              From a creative coding perspective, this project is relatively
              simple&mdash;clouds are made by first drawing a grid of tiny
              circles, altering their position (this is the tough part), and
              then re-drawing those circles again, but with a fill.
              Cross-hatching is done via tiny dashed lines. Texture is done
              through thousands of semi-transparent squiggly lines. From a
              blockchain perspective, this project is much more interesting. I
              encourage you to read more about EthFS and the contracts here.
            </p>
            <p className="max-w-prose">
              Last year I felt perpetually stuck and captured by &ldquo;abstract
              art&rdquo;. Nearly everything I made felt meaningless and
              &ldquo;good&rdquo;. On a whim I made a flower and eventually found
              solace and inspiration in trying to recreate nature inside of a
              computer. I started with tiny flowers, took a detour into birds,
              and ended up with these clouds and an entirely new approach to my
              practice.
            </p>
            <p className="max-w-prose">
              Notable inspiration included: William Ascroft&apos;s Krakatoa
              paintings, wood etchings, and gold leaf.
            </p>
            <p className="max-w-prose">
              —{" "}
              <TextLink
                href="https://twitter.com/generativelight"
                target="_blank"
              >
                Adam
              </TextLink>
            </p>
          </div>
          <hr className="border-1 border-stone-800" />
          <div className="space-y-8">
            <h1 className="text-lg font-bold text-white">From the developer</h1>
            {/* <p className="max-w-prose">
              I am uninspired by most NFT projects. NFTs as a primitive have a
              lot of potential, but we&apos;ve yet to unlock, or even discover,
              all of their capabilities. If they haven&apos;t already been
              rug-pulled, most NFT projects today will die by way of link rot,
              their underlying art and metadata no longer reachable.
            </p> */}
            <p className="max-w-prose">
              A Fundamental Dispute is a different kind of NFT project. It
              exists fully on-chain, meaning that all of the code and data
              needed to render the artwork in your browser is living
              indefinitely on the Ethereum blockchain. The same blockchain
              securing trillions of dollars in transactions is also securing
              your piece of A Fundamental Dispute, ensuring it&apos;s
              retrievable as long as Ethereum is confirming transactions.
              It&apos;s one of the most durable ways data and computation can be
              preserved online—inside the world computer.
            </p>
            <p className="max-w-prose">
              I grew up programming on a TI-83 calculator and building on the
              early-2000&apos;s web, so the constraints of the EVM (the{" "}
              <em>computer</em> part of <em>the world computer</em>) are a
              familiar and fun challenge for me. Writing smart contracts for the
              EVM is a very different programming paradigm, where there&apos;s a
              little room for error and a lot more at stake. Putting a
              generative art project like AFD on-chain is particularly tricky
              because it depends on a heavy, but powerful, library called{" "}
              <TextLink href="https://p5js.org/" target="_blank">
                p5.js
              </TextLink>
              .
            </p>
            <p className="max-w-prose">
              Storing and retrieving files isn&apos;t something the EVM is built
              for. To help with this, I built{" "}
              <TextLink href="https://ethfs.xyz/" target="_blank">
                EthFS
              </TextLink>
              , a &ldquo;filesystem&rdquo; for the Ethereum blockchain. My
              primary motivation was to create a public, on-chain repository of
              highly reusable files that we, as a community of creatives, can
              use in our projects&mdash;Javascript libraries, sounds, fonts,
              etc. And{" "}
              <TextLink
                href="https://twitter.com/frolic/status/1611871714354528256"
                target="_blank"
              >
                we, as a community, got p5.js on chain
              </TextLink>
              .
            </p>
            <p className="max-w-prose">
              I&apos;m also a big fan of building in public and learning from
              those who do. It&apos;s what drew me to Adam&apos;s work. His
              early AFD experiments caught my eye, and once I had a concrete
              path towards putting something like AFD on chain, I reached out to
              see if he wanted to collaborate. Now here we are!
            </p>
            <p className="max-w-prose">
              I hope this work can demonstrate the power of fully on-chain
              artwork and inspire more durable forms of NFTs.
            </p>
            <p className="max-w-prose">
              —{" "}
              <TextLink href="https://twitter.com/frolic" target="_blank">
                frolic
              </TextLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
