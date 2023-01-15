import { gql } from "urql";

import { useTokenOwnerQuery } from "../codegen/indexer";
import { TextLink } from "./TextLink";
import { useENS } from "./useENS";

gql`
  query TokenOwner($id: ID!) {
    token: aFundamentalDisputeToken(id: $id) {
      owner {
        id
      }
    }
  }
`;

type Props = {
  tokenId: number;
};

export const TokenOwner = ({ tokenId }: Props) => {
  const [{ data }] = useTokenOwnerQuery({
    variables: { id: tokenId.toString() },
  });
  const { address, displayName } = useENS(data?.token?.owner?.id);

  if (!address) return <>??</>;

  return (
    <TextLink
      href={`https://opensea.io/${address}`}
      target="_blank"
      title={address}
    >
      {displayName}
    </TextLink>
  );
};
