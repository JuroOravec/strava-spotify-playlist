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
  getCurrentUserConfig: UserConfig;
  hello: Maybe<Scalars['String']>;
};

type Mutation = {
  __typename?: 'Mutation';
  deleteCurrentUser: User;
  deleteCurrentUserProviders: Array<Maybe<UserProvider>>;
  hello: Maybe<Scalars['String']>;
  logoutCurrentUser: User;
  updateCurrentUserConfig: UserConfig;
};


type MutationdeleteCurrentUserProvidersArgs = {
  providerIds: Array<Scalars['String']>;
};


type MutationupdateCurrentUserConfigArgs = {
  userConfigInput: UserConfigInput;
};

type UserConfig = {
  __typename?: 'UserConfig';
  /** Whether user playlists should be created as collaborative */
  playlistCollaborative: Scalars['Boolean'];
  /** Whether user playlists should be created as public */
  playlistPublic: Scalars['Boolean'];
  /** Whether user playlists should be created automatically */
  playlistAutoCreate: Scalars['Boolean'];
  /** Template for creating playlist description */
  playlistDescriptionTemplate: Maybe<Scalars['String']>;
  /** Template for creating playlist title */
  playlistTitleTemplate: Maybe<Scalars['String']>;
  /** Whether activity description should be updated after playlist is created */
  activityDescriptionEnabled: Scalars['Boolean'];
  /** Template for creating updated activity description that includes playlist */
  activityDescriptionTemplate: Maybe<Scalars['String']>;
};

type UserConfigInput = {
  /** Whether user playlists should be created as collaborative */
  playlistCollaborative?: Maybe<Scalars['Boolean']>;
  /** Whether user playlists should be created as public */
  playlistPublic?: Maybe<Scalars['Boolean']>;
  /** Whether user playlists should be created automatically */
  playlistAutoCreate?: Maybe<Scalars['Boolean']>;
  /** Template for creating playlist description */
  playlistDescriptionTemplate?: Maybe<Scalars['String']>;
  /** Template for creating playlist title */
  playlistTitleTemplate?: Maybe<Scalars['String']>;
  /** Whether activity description should be updated after playlist is created */
  activityDescriptionEnabled?: Maybe<Scalars['Boolean']>;
  /** Template for creating updated activity description that includes playlist */
  activityDescriptionTemplate?: Maybe<Scalars['String']>;
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

type deleteCurrentUserMutationVariables = Exact<{ [key: string]: never; }>;


type deleteCurrentUserMutation = (
  { __typename?: 'Mutation' }
  & { deleteCurrentUser: (
    { __typename?: 'User' }
    & Pick<User, 'userId'>
  ) }
);

type deleteCurrentUserIntegrationsMutationVariables = Exact<{
  providerIds: Array<Scalars['String']> | Scalars['String'];
}>;


type deleteCurrentUserIntegrationsMutation = (
  { __typename?: 'Mutation' }
  & { deleteCurrentUserProviders: Array<Maybe<(
    { __typename?: 'UserProvider' }
    & Pick<UserProvider, 'providerId'>
  )>> }
);

type logoutCurrentUserMutationVariables = Exact<{ [key: string]: never; }>;


type logoutCurrentUserMutation = (
  { __typename?: 'Mutation' }
  & { logoutCurrentUser: (
    { __typename?: 'User' }
    & Pick<User, 'userId'>
  ) }
);

type getCurrentUserConfigQueryVariables = Exact<{ [key: string]: never; }>;


type getCurrentUserConfigQuery = (
  { __typename?: 'Query' }
  & { getCurrentUserConfig: (
    { __typename?: 'UserConfig' }
    & Pick<UserConfig, 'playlistCollaborative' | 'playlistPublic' | 'playlistAutoCreate' | 'playlistDescriptionTemplate' | 'playlistTitleTemplate' | 'activityDescriptionEnabled' | 'activityDescriptionTemplate'>
  ) }
);

type updateCurrentUserConfigMutationVariables = Exact<{
  userConfigInput: UserConfigInput;
}>;


type updateCurrentUserConfigMutation = (
  { __typename?: 'Mutation' }
  & { updateCurrentUserConfig: (
    { __typename?: 'UserConfig' }
    & Pick<UserConfig, 'playlistCollaborative' | 'playlistPublic' | 'playlistAutoCreate' | 'playlistDescriptionTemplate' | 'playlistTitleTemplate' | 'activityDescriptionEnabled' | 'activityDescriptionTemplate'>
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
 const deleteCurrentUserDocument = gql`
    mutation deleteCurrentUser {
  deleteCurrentUser {
    userId
  }
}
    `;
 const deleteCurrentUserIntegrationsDocument = gql`
    mutation deleteCurrentUserIntegrations($providerIds: [String!]!) {
  deleteCurrentUserProviders(providerIds: $providerIds) {
    providerId
  }
}
    `;
 const logoutCurrentUserDocument = gql`
    mutation logoutCurrentUser {
  logoutCurrentUser {
    userId
  }
}
    `;
 const getCurrentUserConfigDocument = gql`
    query getCurrentUserConfig {
  getCurrentUserConfig {
    playlistCollaborative
    playlistPublic
    playlistAutoCreate
    playlistDescriptionTemplate
    playlistTitleTemplate
    activityDescriptionEnabled
    activityDescriptionTemplate
  }
}
    `;
 const updateCurrentUserConfigDocument = gql`
    mutation updateCurrentUserConfig($userConfigInput: UserConfigInput!) {
  updateCurrentUserConfig(userConfigInput: $userConfigInput) {
    playlistCollaborative
    playlistPublic
    playlistAutoCreate
    playlistDescriptionTemplate
    playlistTitleTemplate
    activityDescriptionEnabled
    activityDescriptionTemplate
  }
}
    `;
export interface UserConfigOptions {
  __typename?: 'UserConfig';
  playlistCollaborative?: UserConfig['playlistCollaborative'];
  playlistPublic?: UserConfig['playlistPublic'];
  playlistAutoCreate?: UserConfig['playlistAutoCreate'];
  playlistDescriptionTemplate?: UserConfig['playlistDescriptionTemplate'];
  playlistTitleTemplate?: UserConfig['playlistTitleTemplate'];
  activityDescriptionEnabled?: UserConfig['activityDescriptionEnabled'];
  activityDescriptionTemplate?: UserConfig['activityDescriptionTemplate'];
}

export function newUserConfig(
  options: UserConfigOptions = {},
  cache: Record<string, any> = {}
): UserConfig {
  const o = (cache['UserConfig'] = {} as UserConfig);
  o.__typename = 'UserConfig';
  o.playlistCollaborative = options.playlistCollaborative ?? false;
  o.playlistPublic = options.playlistPublic ?? false;
  o.playlistAutoCreate = options.playlistAutoCreate ?? false;
  o.playlistDescriptionTemplate = options.playlistDescriptionTemplate ?? null;
  o.playlistTitleTemplate = options.playlistTitleTemplate ?? null;
  o.activityDescriptionEnabled = options.activityDescriptionEnabled ?? false;
  o.activityDescriptionTemplate = options.activityDescriptionTemplate ?? null;
  return o;
}

function maybeNewUserConfig(
  value: UserConfigOptions | undefined,
  cache: Record<string, any>,
  isSet: boolean = false
): UserConfig {
  if (value === undefined) {
    return isSet ? undefined : cache['UserConfig'] || newUserConfig({}, cache);
  } else if (value.__typename) {
    return value as UserConfig;
  } else {
    return newUserConfig(value, cache);
  }
}

function maybeNewOrNullUserConfig(
  value: UserConfigOptions | undefined | null,
  cache: Record<string, any>
): UserConfig | null {
  if (!value) {
    return null;
  } else if (value.__typename) {
    return value as UserConfig;
  } else {
    return newUserConfig(value, cache);
  }
}
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
interface deleteCurrentUserDataOptions {
  deleteCurrentUser?: UserOptions;
}

export function newdeleteCurrentUserData(data: deleteCurrentUserDataOptions) {
  return {
    __typename: 'Mutation' as const,
    deleteCurrentUser: maybeNewUser(data['deleteCurrentUser'] || undefined, {}),
  };
}

export function newdeleteCurrentUserResponse(
  data: deleteCurrentUserDataOptions | Error
): MockedResponse<deleteCurrentUserMutationVariables, deleteCurrentUserMutation> {
  return {
    request: { query: deleteCurrentUserDocument },
    // TODO Remove the any by having interfaces have a __typename that pacifies mutation type unions
    result: { data: data instanceof Error ? undefined : (newdeleteCurrentUserData(data) as any) },
    error: data instanceof Error ? data : undefined,
  };
}
interface deleteCurrentUserIntegrationsDataOptions {
  deleteCurrentUserProviders?: UserProviderOptions[];
}

export function newdeleteCurrentUserIntegrationsData(
  data: deleteCurrentUserIntegrationsDataOptions
) {
  return {
    __typename: 'Mutation' as const,
    deleteCurrentUserProviders:
      data['deleteCurrentUserProviders']?.map((d) => newUserProvider(d)) || [],
  };
}

export function newdeleteCurrentUserIntegrationsResponse(
  variables: deleteCurrentUserIntegrationsMutationVariables,
  data: deleteCurrentUserIntegrationsDataOptions | Error
): MockedResponse<
  deleteCurrentUserIntegrationsMutationVariables,
  deleteCurrentUserIntegrationsMutation
> {
  return {
    request: { query: deleteCurrentUserIntegrationsDocument, variables },
    // TODO Remove the any by having interfaces have a __typename that pacifies mutation type unions
    result: {
      data: data instanceof Error ? undefined : (newdeleteCurrentUserIntegrationsData(data) as any),
    },
    error: data instanceof Error ? data : undefined,
  };
}
interface logoutCurrentUserDataOptions {
  logoutCurrentUser?: UserOptions;
}

export function newlogoutCurrentUserData(data: logoutCurrentUserDataOptions) {
  return {
    __typename: 'Mutation' as const,
    logoutCurrentUser: maybeNewUser(data['logoutCurrentUser'] || undefined, {}),
  };
}

export function newlogoutCurrentUserResponse(
  data: logoutCurrentUserDataOptions | Error
): MockedResponse<logoutCurrentUserMutationVariables, logoutCurrentUserMutation> {
  return {
    request: { query: logoutCurrentUserDocument },
    // TODO Remove the any by having interfaces have a __typename that pacifies mutation type unions
    result: { data: data instanceof Error ? undefined : (newlogoutCurrentUserData(data) as any) },
    error: data instanceof Error ? data : undefined,
  };
}
interface getCurrentUserConfigDataOptions {
  getCurrentUserConfig?: UserConfigOptions;
}

export function newgetCurrentUserConfigData(data: getCurrentUserConfigDataOptions) {
  return {
    __typename: 'Query' as const,
    getCurrentUserConfig: maybeNewUserConfig(data['getCurrentUserConfig'] || undefined, {}),
  };
}

export function newgetCurrentUserConfigResponse(
  data: getCurrentUserConfigDataOptions | Error
): MockedResponse<getCurrentUserConfigQueryVariables, getCurrentUserConfigQuery> {
  return {
    request: { query: getCurrentUserConfigDocument },
    // TODO Remove the any by having interfaces have a __typename that pacifies mutation type unions
    result: {
      data: data instanceof Error ? undefined : (newgetCurrentUserConfigData(data) as any),
    },
    error: data instanceof Error ? data : undefined,
  };
}
interface updateCurrentUserConfigDataOptions {
  updateCurrentUserConfig?: UserConfigOptions;
}

export function newupdateCurrentUserConfigData(data: updateCurrentUserConfigDataOptions) {
  return {
    __typename: 'Mutation' as const,
    updateCurrentUserConfig: maybeNewUserConfig(data['updateCurrentUserConfig'] || undefined, {}),
  };
}

export function newupdateCurrentUserConfigResponse(
  variables: updateCurrentUserConfigMutationVariables,
  data: updateCurrentUserConfigDataOptions | Error
): MockedResponse<updateCurrentUserConfigMutationVariables, updateCurrentUserConfigMutation> {
  return {
    request: { query: updateCurrentUserConfigDocument, variables },
    // TODO Remove the any by having interfaces have a __typename that pacifies mutation type unions
    result: {
      data: data instanceof Error ? undefined : (newupdateCurrentUserConfigData(data) as any),
    },
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
