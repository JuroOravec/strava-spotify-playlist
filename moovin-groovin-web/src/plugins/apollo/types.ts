/* eslint-disable */
/* This file is autogenerated, see codegen.yml */
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type GqlQuery = {
  __typename?: 'Query';
  getCurrentUser: GqlUser;
  hello: Maybe<Scalars['String']>;
};

export type GqlMutation = {
  __typename?: 'Mutation';
  hello: Maybe<Scalars['String']>;
};

export type GqlUser = {
  __typename?: 'User';
  email: Maybe<Scalars['String']>;
  nameFamily: Maybe<Scalars['String']>;
  nameGiven: Maybe<Scalars['String']>;
  nameDisplay: Maybe<Scalars['String']>;
  photo: Maybe<Scalars['String']>;
  providers: Array<GqlUserProvider>;
};

export type GqlUserProvider = {
  __typename?: 'UserProvider';
  providerId: Scalars['String'];
};

export type GqlgetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GqlgetCurrentUserQuery = (
  { __typename?: 'Query' }
  & { getCurrentUser: (
    { __typename?: 'User' }
    & Pick<GqlUser, 'email'>
  ) }
);

export type QueryKeySpecifier = ('getCurrentUser' | 'hello' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	getCurrentUser?: FieldPolicy<any> | FieldReadFunction<any>,
	hello?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('hello' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	hello?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('email' | 'nameFamily' | 'nameGiven' | 'nameDisplay' | 'photo' | 'providers' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	nameFamily?: FieldPolicy<any> | FieldReadFunction<any>,
	nameGiven?: FieldPolicy<any> | FieldReadFunction<any>,
	nameDisplay?: FieldPolicy<any> | FieldReadFunction<any>,
	photo?: FieldPolicy<any> | FieldReadFunction<any>,
	providers?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserProviderKeySpecifier = ('providerId' | UserProviderKeySpecifier)[];
export type UserProviderFieldPolicy = {
	providerId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TypedTypePolicies = TypePolicies & {
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	},
	UserProvider?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserProviderKeySpecifier | (() => undefined | UserProviderKeySpecifier),
		fields?: UserProviderFieldPolicy,
	}
};
// Generated on 2021-01-24T16:49:41+00:00
