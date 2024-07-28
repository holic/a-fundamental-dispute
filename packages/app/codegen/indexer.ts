import { gql } from 'urql';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: any;
};

export type AFundamentalDisputeToken = {
  readonly __typename?: 'AFundamentalDisputeToken';
  readonly id: Scalars['BigInt'];
  readonly owner?: Maybe<Wallet>;
  readonly seed: Scalars['Int'];
  readonly tokenId: Scalars['BigInt'];
};

export type AFundamentalDisputeTokenFilter = {
  readonly id?: InputMaybe<Scalars['BigInt']>;
  readonly id_gt?: InputMaybe<Scalars['BigInt']>;
  readonly id_gte?: InputMaybe<Scalars['BigInt']>;
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['BigInt']>>>;
  readonly id_lt?: InputMaybe<Scalars['BigInt']>;
  readonly id_lte?: InputMaybe<Scalars['BigInt']>;
  readonly id_not?: InputMaybe<Scalars['BigInt']>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['BigInt']>>>;
  readonly owner?: InputMaybe<Scalars['String']>;
  readonly owner_contains?: InputMaybe<Scalars['String']>;
  readonly owner_ends_with?: InputMaybe<Scalars['String']>;
  readonly owner_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly owner_not?: InputMaybe<Scalars['String']>;
  readonly owner_not_contains?: InputMaybe<Scalars['String']>;
  readonly owner_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly owner_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly owner_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly owner_starts_with?: InputMaybe<Scalars['String']>;
  readonly seed?: InputMaybe<Scalars['Int']>;
  readonly seed_gt?: InputMaybe<Scalars['Int']>;
  readonly seed_gte?: InputMaybe<Scalars['Int']>;
  readonly seed_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']>>>;
  readonly seed_lt?: InputMaybe<Scalars['Int']>;
  readonly seed_lte?: InputMaybe<Scalars['Int']>;
  readonly seed_not?: InputMaybe<Scalars['Int']>;
  readonly seed_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']>>>;
  readonly tokenId?: InputMaybe<Scalars['BigInt']>;
  readonly tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  readonly tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  readonly tokenId_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['BigInt']>>>;
  readonly tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  readonly tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  readonly tokenId_not?: InputMaybe<Scalars['BigInt']>;
  readonly tokenId_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['BigInt']>>>;
};

export type FoldedFacesToken = {
  readonly __typename?: 'FoldedFacesToken';
  readonly id: Scalars['BigInt'];
  readonly mintDiscountUsed: Scalars['Boolean'];
  readonly owner?: Maybe<Wallet>;
  readonly tokenId: Scalars['BigInt'];
};

export type FoldedFacesTokenFilter = {
  readonly id?: InputMaybe<Scalars['BigInt']>;
  readonly id_gt?: InputMaybe<Scalars['BigInt']>;
  readonly id_gte?: InputMaybe<Scalars['BigInt']>;
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['BigInt']>>>;
  readonly id_lt?: InputMaybe<Scalars['BigInt']>;
  readonly id_lte?: InputMaybe<Scalars['BigInt']>;
  readonly id_not?: InputMaybe<Scalars['BigInt']>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['BigInt']>>>;
  readonly mintDiscountUsed?: InputMaybe<Scalars['Boolean']>;
  readonly mintDiscountUsed_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Boolean']>>>;
  readonly mintDiscountUsed_not?: InputMaybe<Scalars['Boolean']>;
  readonly mintDiscountUsed_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Boolean']>>>;
  readonly owner?: InputMaybe<Scalars['String']>;
  readonly owner_contains?: InputMaybe<Scalars['String']>;
  readonly owner_ends_with?: InputMaybe<Scalars['String']>;
  readonly owner_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly owner_not?: InputMaybe<Scalars['String']>;
  readonly owner_not_contains?: InputMaybe<Scalars['String']>;
  readonly owner_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly owner_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly owner_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly owner_starts_with?: InputMaybe<Scalars['String']>;
  readonly tokenId?: InputMaybe<Scalars['BigInt']>;
  readonly tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  readonly tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  readonly tokenId_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['BigInt']>>>;
  readonly tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  readonly tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  readonly tokenId_not?: InputMaybe<Scalars['BigInt']>;
  readonly tokenId_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['BigInt']>>>;
};

export type Query = {
  readonly __typename?: 'Query';
  readonly aFundamentalDisputeToken?: Maybe<AFundamentalDisputeToken>;
  readonly aFundamentalDisputeTokens: ReadonlyArray<AFundamentalDisputeToken>;
  readonly foldedFacesToken?: Maybe<FoldedFacesToken>;
  readonly foldedFacesTokens: ReadonlyArray<FoldedFacesToken>;
  readonly wallet?: Maybe<Wallet>;
  readonly wallets: ReadonlyArray<Wallet>;
};


export type QueryAFundamentalDisputeTokenArgs = {
  id: Scalars['BigInt'];
  timestamp?: InputMaybe<Scalars['Int']>;
};


export type QueryAFundamentalDisputeTokensArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  orderDirection?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  timestamp?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AFundamentalDisputeTokenFilter>;
};


export type QueryFoldedFacesTokenArgs = {
  id: Scalars['BigInt'];
  timestamp?: InputMaybe<Scalars['Int']>;
};


export type QueryFoldedFacesTokensArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  orderDirection?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  timestamp?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FoldedFacesTokenFilter>;
};


export type QueryWalletArgs = {
  id: Scalars['String'];
  timestamp?: InputMaybe<Scalars['Int']>;
};


export type QueryWalletsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  orderDirection?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  timestamp?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<WalletFilter>;
};

export type Wallet = {
  readonly __typename?: 'Wallet';
  readonly afdTokens: ReadonlyArray<AFundamentalDisputeToken>;
  readonly ffTokens: ReadonlyArray<FoldedFacesToken>;
  readonly id: Scalars['String'];
};


export type WalletAfdTokensArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  orderDirection?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  timestamp?: InputMaybe<Scalars['Int']>;
};


export type WalletFfTokensArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  orderDirection?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  timestamp?: InputMaybe<Scalars['Int']>;
};

export type WalletFilter = {
  readonly id?: InputMaybe<Scalars['String']>;
  readonly id_contains?: InputMaybe<Scalars['String']>;
  readonly id_ends_with?: InputMaybe<Scalars['String']>;
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly id_not?: InputMaybe<Scalars['String']>;
  readonly id_not_contains?: InputMaybe<Scalars['String']>;
  readonly id_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly id_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly id_starts_with?: InputMaybe<Scalars['String']>;
};

export type DisputableTokensQueryVariables = Exact<{
  owner: Scalars['String'];
}>;


export type DisputableTokensQuery = { readonly __typename?: 'Query', readonly tokens: ReadonlyArray<{ readonly __typename?: 'AFundamentalDisputeToken', readonly id: any, readonly tokenId: any }> };

export type GalleryFragment = { readonly __typename?: 'AFundamentalDisputeToken', readonly tokenId: any, readonly seed: number };

export type MintButtonQueryVariables = Exact<{
  address: Scalars['String'];
}>;


export type MintButtonQuery = { readonly __typename?: 'Query', readonly foldedFacesTokens: ReadonlyArray<{ readonly __typename?: 'FoldedFacesToken', readonly id: any, readonly tokenId: any }> };

export type TokenOwnerQueryVariables = Exact<{
  id: Scalars['BigInt'];
}>;


export type TokenOwnerQuery = { readonly __typename?: 'Query', readonly token?: { readonly __typename?: 'AFundamentalDisputeToken', readonly owner?: { readonly __typename?: 'Wallet', readonly id: string } | null } | null };

export type ArtPlaceholderQueryVariables = Exact<{
  id: Scalars['BigInt'];
}>;


export type ArtPlaceholderQuery = { readonly __typename?: 'Query', readonly token?: { readonly __typename?: 'AFundamentalDisputeToken', readonly tokenId: any, readonly seed: number } | null };

export type GalleryPageQueryVariables = Exact<{ [key: string]: never; }>;


export type GalleryPageQuery = { readonly __typename?: 'Query', readonly tokens: ReadonlyArray<{ readonly __typename?: 'AFundamentalDisputeToken', readonly tokenId: any, readonly seed: number }> };

export type TokenPageQueryVariables = Exact<{
  id: Scalars['BigInt'];
}>;


export type TokenPageQuery = { readonly __typename?: 'Query', readonly token?: { readonly __typename?: 'AFundamentalDisputeToken', readonly id: any, readonly tokenId: any, readonly seed: number, readonly owner?: { readonly __typename?: 'Wallet', readonly id: string } | null } | null };

export const GalleryFragmentDoc = gql`
    fragment Gallery on AFundamentalDisputeToken {
  tokenId
  seed
}
    `;
export const DisputableTokensDocument = gql`
    query DisputableTokens($owner: String!) {
  tokens: aFundamentalDisputeTokens(
    where: {owner: $owner}
    orderBy: "tokenId"
    first: 1000
  ) {
    id
    tokenId
  }
}
    `;

export function useDisputableTokensQuery(options: Omit<Urql.UseQueryArgs<DisputableTokensQueryVariables>, 'query'>) {
  return Urql.useQuery<DisputableTokensQuery, DisputableTokensQueryVariables>({ query: DisputableTokensDocument, ...options });
};
export const MintButtonDocument = gql`
    query MintButton($address: String!) {
  foldedFacesTokens(
    where: {owner: $address, mintDiscountUsed: false}
    first: 1000
  ) {
    id
    tokenId
  }
}
    `;

export function useMintButtonQuery(options: Omit<Urql.UseQueryArgs<MintButtonQueryVariables>, 'query'>) {
  return Urql.useQuery<MintButtonQuery, MintButtonQueryVariables>({ query: MintButtonDocument, ...options });
};
export const TokenOwnerDocument = gql`
    query TokenOwner($id: BigInt!) {
  token: aFundamentalDisputeToken(id: $id) {
    owner {
      id
    }
  }
}
    `;

export function useTokenOwnerQuery(options: Omit<Urql.UseQueryArgs<TokenOwnerQueryVariables>, 'query'>) {
  return Urql.useQuery<TokenOwnerQuery, TokenOwnerQueryVariables>({ query: TokenOwnerDocument, ...options });
};
export const ArtPlaceholderDocument = gql`
    query ArtPlaceholder($id: BigInt!) {
  token: aFundamentalDisputeToken(id: $id) {
    tokenId
    seed
  }
}
    `;

export function useArtPlaceholderQuery(options: Omit<Urql.UseQueryArgs<ArtPlaceholderQueryVariables>, 'query'>) {
  return Urql.useQuery<ArtPlaceholderQuery, ArtPlaceholderQueryVariables>({ query: ArtPlaceholderDocument, ...options });
};
export const GalleryPageDocument = gql`
    query GalleryPage {
  tokens: aFundamentalDisputeTokens(orderBy: "tokenId", first: 1000) {
    ...Gallery
  }
}
    ${GalleryFragmentDoc}`;

export function useGalleryPageQuery(options?: Omit<Urql.UseQueryArgs<GalleryPageQueryVariables>, 'query'>) {
  return Urql.useQuery<GalleryPageQuery, GalleryPageQueryVariables>({ query: GalleryPageDocument, ...options });
};
export const TokenPageDocument = gql`
    query TokenPage($id: BigInt!) {
  token: aFundamentalDisputeToken(id: $id) {
    id
    tokenId
    seed
    owner {
      id
    }
  }
}
    `;

export function useTokenPageQuery(options: Omit<Urql.UseQueryArgs<TokenPageQueryVariables>, 'query'>) {
  return Urql.useQuery<TokenPageQuery, TokenPageQueryVariables>({ query: TokenPageDocument, ...options });
};