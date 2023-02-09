import { ethers } from "ethers";

import { holderPrice, maxSupply, publicPrice } from "./constants";
import { MintButton } from "./MintButton";
import { MintSignature } from "./MintSignature";
import { TextLink } from "./TextLink";
import { useTotalMinted } from "./useTotalMinted";

export const MintSection = () => {
  const totalMinted = useTotalMinted();
  if (!totalMinted || totalMinted?.gte(maxSupply)) {
    return null;
  }
  return (
    <div>
      <MintButton />
      <MintSignature />
      <p className="italic">
        {ethers.BigNumber.from(maxSupply).sub(totalMinted).toString()} of{" "}
        {maxSupply} pieces remaining.
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
  );
};
