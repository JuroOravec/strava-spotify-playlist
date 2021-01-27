/** OAuth token for a third party service (provider) */
export interface AuthToken {
  /** ID of the user in the third party service */
  providerUserId: string;
  /** ID of the third party service */
  providerId: string;
  /** When is the OAuth access token expires */
  expiresAt: number;
  /** OAuth access token for a particular user at particular service */
  accessToken: string;
  /** OAuth refresh token for a particular user at particular service */
  refreshToken: string;
}

/** OAuth token for a third party service (provider) associated with a particular user */
export interface UserTokenModel extends AuthToken {
  /** ID we assigned to the user */
  internalUserId: string;
  /** Permission scope for a particular user at particular service */
  scope: string | null;
}

export type UserTokenMeta = Pick<
  UserTokenModel,
  'providerUserId' | 'providerId' | 'internalUserId'
>;

export type UserTokenProviderInput = Pick<
  UserTokenModel,
  'providerUserId' | 'providerId'
>;

export type UserTokenProviderAndUserInput = Pick<
  UserTokenModel,
  'internalUserId' | 'providerId'
>;

export interface TokenStore {
  install: () => Promise<void>;
  close: () => Promise<void>;
  delete: (data: UserTokenProviderInput[]) => Promise<(UserTokenMeta | null)[]>;
  deleteByUsersAndProviders: (
    data: UserTokenProviderAndUserInput[]
  ) => Promise<(UserTokenMeta | null)[]>;
  get: (data: UserTokenProviderInput[]) => Promise<(UserTokenModel | null)[]>;
  getByProviders: (
    providerIds: string[]
  ) => Promise<(UserTokenModel[] | null)[]>;
  getByTokens: (
    data: {
      startProviderUserId: string;
      startProviderId: string;
      targetProviderId: string;
    }[]
  ) => Promise<(UserTokenModel | null)[]>;
  getByUsers: (
    internalUserIds: string[]
  ) => Promise<(UserTokenModel[] | null)[]>;
  upsert: (tokenData: UserTokenModel[]) => Promise<(UserTokenMeta | null)[]>;
}

export type StoreTokenEmits =
  | ['storeToken:didCreateToken', [UserTokenModel]]
  | ['storeToken:didDeleteToken', [UserTokenMeta]];
