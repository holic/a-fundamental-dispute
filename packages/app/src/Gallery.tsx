import { ConnectButton } from "@rainbow-me/rainbowkit";

import { ArtPreview } from "./ArtPreview";

const tokenIds = new Array(218).fill(1).map((value, i) => value + i);

export const Gallery = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="self-end p-2">
        <ConnectButton />
      </div>
      <div className="flex-grow flex flex-col gap-4 items-center justify-center pb-[50vh]">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl py-12 md:py-16 lg:py-20 text-amber-100 text-center">
          A Fundamental Dispute
        </h1>

        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-[8vw] px-[8vw]">
          {tokenIds.map((tokenId) => (
            <a
              key={tokenId}
              href={`/art/${tokenId}`}
              className="block w-full aspect-[400/550] relative group"
            >
              <ArtPreview tokenId={tokenId} />
              <div className="absolute left-0 right-0 top-1/2 bottom-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-b from-transparent via-stone-600/60 to-stone-600 flex flex-col items-center justify-end p-4">
                {tokenId}/218
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
