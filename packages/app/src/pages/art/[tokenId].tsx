import { ethers } from "ethers";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { gql } from "urql";

import {
  TokenPageQuery,
  TokenPageQueryVariables,
} from "../../../codegen/indexer";
import { ArtPreview } from "../../ArtPreview";
import { maxSupply } from "../../constants";
import { contracts, tokenContract } from "../../contracts";
import { targetChainId } from "../../EthereumProviders";
import { TextLink } from "../../TextLink";
import { TokenOwner } from "../../TokenOwner";
import { TopBar } from "../../TopBar";
import { graphClient } from "../_app";

// TODO: generate static paths

const tokenPageQuery = gql`
  query TokenPage($id: ID!) {
    token: aFundamentalDisputeToken(id: $id) {
      id
      tokenId
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

export const getServerSideProps: GetServerSideProps<
  Props,
  { tokenId: string }
> = async (context) => {
  const id = context.params?.tokenId;
  if (!id || !/^\d+$/.test(id)) return { notFound: true };

  const res = await graphClient
    .query<TokenPageQuery, TokenPageQueryVariables>(tokenPageQuery, { id })
    .toPromise();

  if (res.data?.token) {
    return {
      props: {
        tokenId: res.data.token.tokenId,
        owner: res.data.token.owner?.id,
      },
    };
  }

  const tokenId = parseInt(id);
  const owner = await tokenContract.ownerOf(tokenId);
  if (owner !== ethers.constants.AddressZero) {
    return {
      props: {
        tokenId,
        owner,
      },
    };
  }

  return {
    props: {
      tokenId,
    },
  };
};

const ArtPage: NextPage<Props> = ({ tokenId, owner }) => (
  <>
    <Head>
      {/* Using string interpolation here because Next.js complains if <title> has multiple children/nodes */}
      <title>{`${tokenId}/${maxSupply} — A Fundamental Dispute`}</title>
    </Head>
    <TopBar />
    <div className="min-h-screen flex flex-col items-center justify-center p-[8vw]">
      <div className="w-full max-w-[1000px] flex flex-col gap-2">
        <div className="flex justify-end">
          {tokenId}/{maxSupply}
        </div>
        <div className="aspect-[400/550] relative">
          {tokenId ? <ArtPreview tokenId={tokenId} /> : null}
        </div>
        <div className="flex justify-between">
          <span>
            Owned by <TokenOwner tokenId={tokenId} owner={owner} />
          </span>
          <span>
            <TextLink
              href={
                targetChainId === 1
                  ? `https://opensea.io/assets/ethereum/${contracts.AFundamentalDispute.address}/${tokenId}`
                  : `https://testnets.opensea.io/assets/goerli/${contracts.AFundamentalDispute.address}/${tokenId}`
              }
              target="_blank"
            >
              View on OpenSea ⇒
            </TextLink>
          </span>
        </div>
      </div>
    </div>
  </>
);

export default ArtPage;
