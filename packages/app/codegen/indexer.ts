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
};

export type AFundamentalDisputeToken = {
  readonly __typename?: 'AFundamentalDisputeToken';
  readonly html: Scalars['String'];
  readonly id: Scalars['ID'];
  readonly owner?: Maybe<Wallet>;
  readonly ownerAddress: Scalars['String'];
  readonly seed: Scalars['Int'];
  readonly tokenId: Scalars['Int'];
};

export type AFundamentalDisputeTokenFilter = {
  readonly html?: InputMaybe<Scalars['String']>;
  readonly html_ends_with?: InputMaybe<Scalars['String']>;
  readonly html_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly html_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly html_not?: InputMaybe<Scalars['String']>;
  readonly html_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly html_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly html_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly html_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly html_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly html_starts_with?: InputMaybe<Scalars['String']>;
  readonly html_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  readonly id_not?: InputMaybe<Scalars['ID']>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  readonly ownerAddress?: InputMaybe<Scalars['String']>;
  readonly ownerAddress_ends_with?: InputMaybe<Scalars['String']>;
  readonly ownerAddress_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly ownerAddress_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly ownerAddress_not?: InputMaybe<Scalars['String']>;
  readonly ownerAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly ownerAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly ownerAddress_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly ownerAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly ownerAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly ownerAddress_starts_with?: InputMaybe<Scalars['String']>;
  readonly ownerAddress_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly seed?: InputMaybe<Scalars['Int']>;
  readonly seed_gt?: InputMaybe<Scalars['Int']>;
  readonly seed_gte?: InputMaybe<Scalars['Int']>;
  readonly seed_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']>>>;
  readonly seed_lt?: InputMaybe<Scalars['Int']>;
  readonly seed_lte?: InputMaybe<Scalars['Int']>;
  readonly seed_not?: InputMaybe<Scalars['Int']>;
  readonly seed_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']>>>;
  readonly tokenId?: InputMaybe<Scalars['Int']>;
  readonly tokenId_gt?: InputMaybe<Scalars['Int']>;
  readonly tokenId_gte?: InputMaybe<Scalars['Int']>;
  readonly tokenId_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']>>>;
  readonly tokenId_lt?: InputMaybe<Scalars['Int']>;
  readonly tokenId_lte?: InputMaybe<Scalars['Int']>;
  readonly tokenId_not?: InputMaybe<Scalars['Int']>;
  readonly tokenId_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']>>>;
};

export type FoldedFacesToken = {
  readonly __typename?: 'FoldedFacesToken';
  readonly id: Scalars['ID'];
  readonly mintDiscountUsed: Scalars['Boolean'];
  readonly owner?: Maybe<Wallet>;
  readonly ownerAddress: Scalars['String'];
  readonly tokenId: Scalars['Int'];
};

export type FoldedFacesTokenFilter = {
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  readonly id_not?: InputMaybe<Scalars['ID']>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  readonly mintDiscountUsed?: InputMaybe<Scalars['Boolean']>;
  readonly mintDiscountUsed_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Boolean']>>>;
  readonly mintDiscountUsed_not?: InputMaybe<Scalars['Boolean']>;
  readonly mintDiscountUsed_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Boolean']>>>;
  readonly ownerAddress?: InputMaybe<Scalars['String']>;
  readonly ownerAddress_ends_with?: InputMaybe<Scalars['String']>;
  readonly ownerAddress_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly ownerAddress_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly ownerAddress_not?: InputMaybe<Scalars['String']>;
  readonly ownerAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly ownerAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly ownerAddress_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly ownerAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly ownerAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly ownerAddress_starts_with?: InputMaybe<Scalars['String']>;
  readonly ownerAddress_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly tokenId?: InputMaybe<Scalars['Int']>;
  readonly tokenId_gt?: InputMaybe<Scalars['Int']>;
  readonly tokenId_gte?: InputMaybe<Scalars['Int']>;
  readonly tokenId_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']>>>;
  readonly tokenId_lt?: InputMaybe<Scalars['Int']>;
  readonly tokenId_lte?: InputMaybe<Scalars['Int']>;
  readonly tokenId_not?: InputMaybe<Scalars['Int']>;
  readonly tokenId_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']>>>;
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
  id: Scalars['ID'];
};


export type QueryAFundamentalDisputeTokensArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  orderDirection?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AFundamentalDisputeTokenFilter>;
};


export type QueryFoldedFacesTokenArgs = {
  id: Scalars['ID'];
};


export type QueryFoldedFacesTokensArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  orderDirection?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FoldedFacesTokenFilter>;
};


export type QueryWalletArgs = {
  id: Scalars['ID'];
};


export type QueryWalletsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  orderDirection?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<WalletFilter>;
};

export type Wallet = {
  readonly __typename?: 'Wallet';
  readonly afdTokens: ReadonlyArray<AFundamentalDisputeToken>;
  readonly ffTokens: ReadonlyArray<FoldedFacesToken>;
  readonly id: Scalars['ID'];
};

export type WalletFilter = {
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  readonly id_not?: InputMaybe<Scalars['ID']>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
};

export type ArtPreviewQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ArtPreviewQuery = { readonly __typename?: 'Query', readonly token?: { readonly __typename?: 'AFundamentalDisputeToken', readonly id: string, readonly html: string } | null };

export type MintButtonQueryVariables = Exact<{
  address: Scalars['String'];
}>;


export type MintButtonQuery = { readonly __typename?: 'Query', readonly foldedFacesTokens: ReadonlyArray<{ readonly __typename?: 'FoldedFacesToken', readonly id: string, readonly tokenId: number }> };

export type TokenOwnerQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TokenOwnerQuery = { readonly __typename?: 'Query', readonly token?: { readonly __typename?: 'AFundamentalDisputeToken', readonly owner?: { readonly __typename?: 'Wallet', readonly id: string } | null } | null };

export type GalleryPageQueryVariables = Exact<{ [key: string]: never; }>;


export type GalleryPageQuery = { readonly __typename?: 'Query', readonly tokens: ReadonlyArray<{ readonly __typename?: 'AFundamentalDisputeToken', readonly id: string, readonly tokenId: number }> };


export const ArtPreviewDocument = gql`
    query ArtPreview($id: ID!) {
  token: aFundamentalDisputeToken(id: $id) {
    id
    html
  }
}
    `;

export function useArtPreviewQuery(options: Omit<Urql.UseQueryArgs<ArtPreviewQueryVariables>, 'query'>) {
  return Urql.useQuery<ArtPreviewQuery, ArtPreviewQueryVariables>({ query: ArtPreviewDocument, ...options });
};
export const MintButtonDocument = gql`
    query MintButton($address: String!) {
  foldedFacesTokens(where: {ownerAddress: $address, mintDiscountUsed: false}) {
    id
    tokenId
  }
}
    `;

export function useMintButtonQuery(options: Omit<Urql.UseQueryArgs<MintButtonQueryVariables>, 'query'>) {
  return Urql.useQuery<MintButtonQuery, MintButtonQueryVariables>({ query: MintButtonDocument, ...options });
};
export const TokenOwnerDocument = gql`
    query TokenOwner($id: ID!) {
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
export const GalleryPageDocument = gql`
    query GalleryPage {
  tokens: aFundamentalDisputeTokens {
    id
    tokenId
  }
}
    `;

export function useGalleryPageQuery(options?: Omit<Urql.UseQueryArgs<GalleryPageQueryVariables>, 'query'>) {
  return Urql.useQuery<GalleryPageQuery, GalleryPageQueryVariables>({ query: GalleryPageDocument, ...options });
};