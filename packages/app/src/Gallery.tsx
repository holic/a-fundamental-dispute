import { gql } from "urql";

import { useGalleryQuery } from "../codegen/indexer";
import { ArtPreview } from "./ArtPreview";
import { PendingIcon } from "./PendingIcon";

gql`
  query Gallery {
    tokens: aFundamentalDisputeTokens {
      id
      tokenId
    }
  }
`;

export const Gallery = () => {
  const [{ data }] = useGalleryQuery();

  if (!data)
    return (
      <div className="fixed inset-0 p-[8vw] flex items-center justify-center text-xl">
        <PendingIcon />
      </div>
    );

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-[8vw] p-[8vw]">
      {data.tokens.map((token) => (
        <a
          key={token.id}
          href={`/art/${token.id}`}
          className="block w-full aspect-[400/550] relative hover:scale-110 transition duration-500 text-stone-500 hover:text-stone-300"
        >
          <ArtPreview id={token.id} />
          <span className="absolute bottom-full right-0 text-sm leading-relaxed">
            {token.tokenId}/218
          </span>
        </a>
      ))}
    </div>
  );
};
