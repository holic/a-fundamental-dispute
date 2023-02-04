import { ArtPreview } from "./ArtPreview";
import { maxSupply } from "./constants";
import { PendingIcon } from "./PendingIcon";

type Props = {
  tokenIds: number[];
};

export const Gallery = ({ tokenIds }: Props) => {
  if (!tokenIds.length)
    return (
      <div className="fixed inset-0 p-[8vw] flex items-center justify-center text-xl">
        <PendingIcon />
      </div>
    );

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-[8vw] p-[8vw]">
      {tokenIds.map((tokenId) => (
        <a
          key={tokenId}
          href={`/art/${tokenId}`}
          className="block w-full aspect-[400/550] relative hover:scale-110 transition duration-500 text-stone-500 hover:text-stone-300"
        >
          <ArtPreview tokenId={tokenId} disablePointerEvents useImage />
          <span className="absolute bottom-full right-0 text-sm leading-relaxed">
            {tokenId}/{maxSupply}
          </span>
        </a>
      ))}
    </div>
  );
};
