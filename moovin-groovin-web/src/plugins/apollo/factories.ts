/* eslint-disable */
/* This file is autogenerated, see codegen.yml */
import gql from 'graphql-tag';
type Maybe<T> = T | null;
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

type Query = {
  __typename?: 'Query';
  getCurrentUser: User;
  hello: Maybe<Scalars['String']>;
};

type Mutation = {
  __typename?: 'Mutation';
  hello: Maybe<Scalars['String']>;
};

type User = {
  __typename?: 'User';
  userId: Scalars['String'];
  email: Maybe<Scalars['String']>;
  nameFamily: Maybe<Scalars['String']>;
  nameGiven: Maybe<Scalars['String']>;
  nameDisplay: Maybe<Scalars['String']>;
  photo: Maybe<Scalars['String']>;
  providers: Array<UserProvider>;
};

type UserProvider = {
  __typename?: 'UserProvider';
  providerId: Scalars['String'];
};

type getCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


type getCurrentUserQuery = (
  { __typename?: 'Query' }
  & { getCurrentUser: (
    { __typename?: 'User' }
    & Pick<User, 'userId' | 'email' | 'nameFamily' | 'nameGiven' | 'nameDisplay' | 'photo'>
    & { providers: Array<(
      { __typename?: 'UserProvider' }
      & Pick<UserProvider, 'providerId'>
    )> }
  ) }
);


 const getCurrentUserDocument = gql`
    query getCurrentUser {
  getCurrentUser {
    userId
    email
    nameFamily
    nameGiven
    nameDisplay
    photo
    providers {
      providerId
    }
  }
}
    `;
export interface UserOptions {
  __typename?: 'User';
  userId?: User['userId'];
  email?: User['email'];
  nameFamily?: User['nameFamily'];
  nameGiven?: User['nameGiven'];
  nameDisplay?: User['nameDisplay'];
  photo?: User['photo'];
  providers?: Array<UserProviderOptions>;
}

export function newUser(options: UserOptions = {}, cache: Record<string, any> = {}): User {
  const o = (cache['User'] = {} as User);
  o.__typename = 'User';
  o.userId = options.userId ?? 'userId';
  o.email = options.email ?? null;
  o.nameFamily = options.nameFamily ?? null;
  o.nameGiven = options.nameGiven ?? null;
  o.nameDisplay = options.nameDisplay ?? null;
  o.photo = options.photo ?? null;
  o.providers = (options.providers ?? []).map((i) =>
    maybeNewUserProvider(i, cache, options.hasOwnProperty('providers'))
  );
  return o;
}

function maybeNewUser(
  value: UserOptions | undefined,
  cache: Record<string, any>,
  isSet: boolean = false
): User {
  if (value === undefined) {
    return isSet ? undefined : cache['User'] || newUser({}, cache);
  } else if (value.__typename) {
    return value as User;
  } else {
    return newUser(value, cache);
  }
}

function maybeNewOrNullUser(
  value: UserOptions | undefined | null,
  cache: Record<string, any>
): User | null {
  if (!value) {
    return null;
  } else if (value.__typename) {
    return value as User;
  } else {
    return newUser(value, cache);
  }
}
export interface UserProviderOptions {
  __typename?: 'UserProvider';
  providerId?: UserProvider['providerId'];
}

export function newUserProvider(
  options: UserProviderOptions = {},
  cache: Record<string, any> = {}
): UserProvider {
  const o = (cache['UserProvider'] = {} as UserProvider);
  o.__typename = 'UserProvider';
  o.providerId = options.providerId ?? 'providerId';
  return o;
}

function maybeNewUserProvider(
  value: UserProviderOptions | undefined,
  cache: Record<string, any>,
  isSet: boolean = false
): UserProvider {
  if (value === undefined) {
    return isSet ? undefined : cache['UserProvider'] || newUserProvider({}, cache);
  } else if (value.__typename) {
    return value as UserProvider;
  } else {
    return newUserProvider(value, cache);
  }
}

function maybeNewOrNullUserProvider(
  value: UserProviderOptions | undefined | null,
  cache: Record<string, any>
): UserProvider | null {
  if (!value) {
    return null;
  } else if (value.__typename) {
    return value as UserProvider;
  } else {
    return newUserProvider(value, cache);
  }
}
let nextFactoryIds: Record<string, number> = {};

export function resetFactoryIds() {
  nextFactoryIds = {};
}

function nextFactoryId(objectName: string): string {
  const nextId = nextFactoryIds[objectName] || 1;
  nextFactoryIds[objectName] = nextId + 1;
  return String(nextId);
}

interface getCurrentUserDataOptions {
  getCurrentUser?: UserOptions;
}

export function newgetCurrentUserData(data: getCurrentUserDataOptions) {
  return {
    __typename: 'Query' as const,
    getCurrentUser: maybeNewUser(data['getCurrentUser'] || undefined, {}),
  };
}

export function newgetCurrentUserResponse(
  data: getCurrentUserDataOptions | Error
): MockedResponse<getCurrentUserQueryVariables, getCurrentUserQuery> {
  return {
    request: { query: getCurrentUserDocument },
    // TODO Remove the any by having interfaces have a __typename that pacifies mutation type unions
    result: { data: data instanceof Error ? undefined : (newgetCurrentUserData(data) as any) },
    error: data instanceof Error ? data : undefined,
  };
}

  export type MockedResponse<V, Q> = {
    request: {
      query: any;
      variables?: V;
    };
    result: {
      data?: Q;
    };
    error?: Error;
    // Note this only works if using Homebound's better-apollo-mocked-provider
    requestedCount?: number;
  };
