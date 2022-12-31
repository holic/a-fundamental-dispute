import { ArtPreview } from "./ArtPreview";

const tokenIds = new Array(218).fill(1).map((value, i) => value + i);

export const Gallery = () => (
  <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-[8vw] p-[8vw]">
    {tokenIds.map((tokenId) => (
      <a
        key={tokenId}
        href={`/art/${tokenId}`}
        className="block w-full aspect-[400/550] relative hover:scale-110 transition duration-500 text-stone-500 hover:text-stone-300"
      >
        <ArtPreview tokenId={tokenId} />
        <span className="absolute bottom-full right-0 text-sm leading-relaxed">
          {tokenId}/218
        </span>
      </a>
    ))}
  </div>
);
