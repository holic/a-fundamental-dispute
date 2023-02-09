import { useEffect } from "react";
import { gql } from "urql";

import { useTokenOwnerQuery } from "../codegen/indexer";
import { TextLink } from "./TextLink";
import { useENS } from "./useENS";
import { useIsMounted } from "./useIsMounted";

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
  owner?: string;
};

export const TokenOwner = ({ tokenId, owner }: Props) => {
  const isMounted = useIsMounted();

  const [{ data, error, fetching }, executeQuery] = useTokenOwnerQuery({
    variables: { id: tokenId.toString() },
    pause: !!owner || !isMounted,
  });

  useEffect(() => {
    if (data?.token || error || fetching || owner) return;
    const timer = setInterval(() => {
      console.log("checking for token");
      executeQuery({ requestPolicy: "cache-and-network" });
    }, 1000);
    return () => clearInterval(timer);
  }, [data?.token, error, executeQuery, fetching, owner]);

  const { address, displayName } = useENS(
    isMounted ? owner ?? data?.token?.owner?.id : undefined
  );
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
