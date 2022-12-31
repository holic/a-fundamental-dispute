import { ArtPreview } from "./ArtPreview";

const tokenIds = new Array(218).fill(1).map((value, i) => value + i);

export const Gallery = () => (
  <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-[8vw] p-[8vw]">
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
);
