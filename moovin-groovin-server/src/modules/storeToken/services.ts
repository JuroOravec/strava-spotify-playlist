import logger from '../../lib/logger';
import {
  assertContext,
  ServerModule,
  ServerModules,
  Services,
} from '../../lib/ServerModule';
import type { TokenStoreData } from './data';
import {
  UserTokenModel,
  UserTokenMeta,
  UserTokenProviderInput,
  StoreTokenEmits,
} from './types';
import assertTokenStore from './utils/assertTokenStore';

interface ResolveTokensOptions {
  startProviderId: string;
  startProviderUserId: string;
  targetProviderIds: string[];
}

interface StoreTokenServices extends Services {
  deleteToken: (data: UserTokenProviderInput) => Promise<UserTokenMeta | null>;
  deleteTokens: (
    data: UserTokenProviderInput[]
  ) => Promise<(UserTokenMeta | null)[]>;
  getToken: (data: UserTokenProviderInput) => Promise<UserTokenModel | null>;
  getTokens: (
    data: UserTokenProviderInput[]
  ) => Promise<(UserTokenModel | null)[]>;
  getTokensByProvider: (providerId: string) => Promise<UserTokenModel[] | null>;
  getTokensByProviders: (
    providerIds: string[]
  ) => Promise<(UserTokenModel[] | null)[]>;
  getTokenByToken: (data: {
    startProviderUserId: string;
    startProviderId: string;
    targetProviderId: string;
  }) => Promise<UserTokenModel | null>;
  getTokensByTokens: (
    data: {
      startProviderUserId: string;
      startProviderId: string;
      targetProviderId: string;
    }[]
  ) => Promise<(UserTokenModel | null)[]>;
  getTokensByUser: (internalUserId: string) => Promise<UserTokenModel[] | null>;
  getTokensByUsers: (
    internalUserIds: string[]
  ) => Promise<(UserTokenModel[] | null)[]>;
  upsertToken: (token: UserTokenModel) => Promise<UserTokenMeta | null>;
  upsertTokens: (tokens: UserTokenModel[]) => Promise<(UserTokenMeta | null)[]>;
  resolveTokens: (input: ResolveTokensOptions) => Promise<UserTokenModel[]>;
}

type ThisModule = ServerModule<
  StoreTokenServices,
  any,
  TokenStoreData,
  ServerModules,
  StoreTokenEmits
>;

const createTokenStoreServices = (): StoreTokenServices => {
  async function deleteToken(
    this: ThisModule,
    data: UserTokenProviderInput
  ): Promise<UserTokenMeta | null> {
    const [result = null] = await this.services.deleteTokens([data]);
    return result;
  }
  async function deleteTokens(
    this: ThisModule,
    data: UserTokenProviderInput[]
  ): Promise<(UserTokenMeta | null)[]> {
    if (!data.length) return [];
    assertTokenStore(this.data.tokenStore);
    const response = await this.data.tokenStore.delete(data);

    response.forEach((maybeTokenMeta) => {
      if (!maybeTokenMeta) return;
      this.emit('storeToken:didDeleteToken', maybeTokenMeta);
    });

    return response;
  }

  async function getToken(
    this: ThisModule,
    data: UserTokenProviderInput
  ): Promise<UserTokenModel | null> {
    const [token = null] = await this.services.getTokens([data]);
    return token;
  }

  async function getTokens(
    this: ThisModule,
    data: UserTokenProviderInput[]
  ): Promise<(UserTokenModel | null)[]> {
    if (!data.length) return [];
    assertTokenStore(this.data.tokenStore);
    return this.data.tokenStore.get(data);
  }

  async function getTokensByProvider(
    this: ThisModule,
    providerId: string
  ): Promise<UserTokenModel[] | null> {
    const [result = null] = await this.services.getTokensByProviders([
      providerId,
    ]);
    return result;
  }

  async function getTokensByProviders(
    this: ThisModule,
    providerIds: string[]
  ): Promise<(UserTokenModel[] | null)[]> {
    if (!providerIds.length) return [];
    assertTokenStore(this.data.tokenStore);
    return this.data.tokenStore.getByProviders(providerIds);
  }

  async function getTokenByToken(
    this: ThisModule,
    data: {
      startProviderUserId: string;
      startProviderId: string;
      targetProviderId: string;
    }
  ): Promise<UserTokenModel | null> {
    const [result = null] = await this.services.getTokensByTokens([data]);
    return result;
  }

  async function getTokensByTokens(
    this: ThisModule,
    data: {
      startProviderUserId: string;
      startProviderId: string;
      targetProviderId: string;
    }[]
  ): Promise<(UserTokenModel | null)[]> {
    if (!data.length) return [];
    assertTokenStore(this.data.tokenStore);
    return this.data.tokenStore.getByTokens(data);
  }

  async function getTokensByUser(
    this: ThisModule,
    internalUserId: string
  ): Promise<UserTokenModel[] | null> {
    const [result = null] = await this.services.getTokensByUsers([
      internalUserId,
    ]);
    return result;
  }

  async function getTokensByUsers(
    this: ThisModule,
    internalUserIds: string[]
  ): Promise<(UserTokenModel[] | null)[]> {
    if (!internalUserIds.length) return [];
    assertTokenStore(this.data.tokenStore);
    return this.data.tokenStore.getByUsers(internalUserIds);
  }

  async function upsertToken(
    this: ThisModule,
    token: UserTokenModel
  ): Promise<UserTokenMeta | null> {
    const [tokenResponse] = await this.services.upsertTokens([token]);
    return tokenResponse;
  }

  async function upsertTokens(
    this: ThisModule,
    tokens: UserTokenModel[]
  ): Promise<(UserTokenMeta | null)[]> {
    if (!tokens.length) return [];
    assertTokenStore(this.data.tokenStore);
    const response = await this.data.tokenStore.upsert(tokens);

    response.forEach((maybeTokenMeta, i) => {
      if (!maybeTokenMeta) return;
      this.emit('storeToken:didCreateToken', tokens[i]);
    });

    return response;
  }

  async function resolveTokens(
    this: ThisModule,
    options: ResolveTokensOptions
  ): Promise<UserTokenModel[]> {
    const { startProviderId, startProviderUserId, targetProviderIds } = options;

    if (!startProviderId) {
      throw Error(`Cannot resolve user. ${startProviderId}UserId is missing.`);
    }

    // Find user's spotify access token using strava access token
    assertContext(this.context);
    const targetTokens = await this.services.getTokensByTokens(
      targetProviderIds.map((targetProviderId) => ({
        startProviderId,
        startProviderUserId,
        targetProviderId,
      }))
    );

    targetTokens.forEach((token, i) => {
      const { providerUserId } = token || {};

      if (!token || !providerUserId) {
        throw Error(
          `Failed to find user's ${targetProviderIds[i]} access token.`
        );
      }
    });

    return targetTokens as UserTokenModel[];
  }

  return {
    deleteToken,
    deleteTokens,
    getToken,
    getTokens,
    getTokensByProvider,
    getTokensByProviders,
    getTokenByToken,
    getTokensByTokens,
    getTokensByUser,
    getTokensByUsers,
    upsertToken,
    upsertTokens,
    resolveTokens,
  };
};

export { createTokenStoreServices as default, StoreTokenServices };