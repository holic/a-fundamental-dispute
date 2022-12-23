import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";

import { ArtPreview } from "../ArtPreview";

const tokenIds = new Array(218).fill(1).map((value, i) => value + i);

const HomePage: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="self-end p-2">
        <ConnectButton />
      </div>
      <div className="flex-grow flex flex-col gap-4 items-center justify-center pb-[50vh]">
        <h1 className="text-7xl p-20 text-amber-100">A Fundamental Dispute</h1>

        <div className="w-full grid grid-cols-3 gap-[8vw] px-[8vw]">
          {tokenIds.map((tokenId) => (
            <div key={tokenId} className="text-xl">
              <div className="w-full aspect-[400/550]">
                <ArtPreview url={`/render.html?tokenId=${tokenId}`} />
              </div>
              {tokenId}/218
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
