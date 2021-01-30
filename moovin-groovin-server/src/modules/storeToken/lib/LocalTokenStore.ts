import type {
  UserTokenModel,
  UserTokenMeta,
  TokenStore,
  UserTokenProviderInput,
  UserTokenProviderAndUserInput,
} from '../types';

type ProviderStore = Map<string, UserTokenModel>;

class LocalTokenStore implements TokenStore {
  private store = new Map<string, ProviderStore>();
  private storeByUserId = new Map<string, UserTokenModel[]>();
  async install(): Promise<void> {}

  async close(): Promise<void> {
    this.store.clear();
  }

  getProviderStore(providerId: string): ProviderStore {
    const providerStore: ProviderStore =
      this.store.get(providerId) || new Map();
    if (!this.store.has(providerId)) this.store.set(providerId, providerStore);
    return providerStore;
  }

  async delete(
    tokenData: UserTokenProviderInput[]
  ): Promise<(UserTokenMeta | null)[]> {
    return tokenData.map(({ providerId, providerUserId }) => {
      const providerStore = this.getProviderStore(providerId);
      const removedToken = providerStore.get(providerUserId);
      if (!removedToken) return null;

      const { internalUserId } = removedToken;

      providerStore.delete(providerUserId);
      const userTokens = this.storeByUserId.get(internalUserId) || [];
      const indexToRemove = userTokens.findIndex(
        (token) =>
          token.providerId === providerId &&
          token.providerUserId === providerUserId
      );
      if (indexToRemove !== -1) userTokens.splice(indexToRemove, 1);
      if (!userTokens.length) this.storeByUserId.delete(internalUserId);

      return {
        internalUserId,
        providerId,
        providerUserId,
      };
    });
  }

  async deleteByUsersAndProviders(
    tokenData: UserTokenProviderAndUserInput[]
  ): Promise<(UserTokenMeta | null)[]> {
    return tokenData.map(({ providerId, internalUserId }) => {
      const providerStore = this.getProviderStore(providerId);
      const removedToken = Array.from(providerStore.values()).find(
        (token) =>
          token.providerId === providerId &&
          token.internalUserId === internalUserId
      );
      if (!removedToken) return null;

      const { providerUserId } = removedToken;

      providerStore.delete(providerUserId);
      const userTokens = this.storeByUserId.get(internalUserId) || [];
      const indexToRemove = userTokens.findIndex(
        (token) =>
          token.providerId === providerId &&
          token.providerUserId === providerUserId
      );
      if (indexToRemove !== -1) userTokens.splice(indexToRemove, 1);
      if (!userTokens.length) this.storeByUserId.delete(internalUserId);

      return {
        internalUserId,
        providerId,
        providerUserId,
      };
    });
  }

  async get(
    tokenData: UserTokenProviderInput[]
  ): Promise<(UserTokenModel | null)[]> {
    return tokenData.map(({ providerId, providerUserId }) => {
      const providerStore = this.getProviderStore(providerId);
      return providerStore.get(providerUserId) || null;
    });
  }

  async getByProviders(
    providerIds: string[]
  ): Promise<(UserTokenModel[] | null)[]> {
    return providerIds.map((providerId) => {
      const providerStore = this.getProviderStore(providerId);
      const values = Array.from(providerStore.values());
      return values.length ? values : null;
    });
  }

  async getByTokens(
    data: {
      startProviderUserId: string;
      startProviderId: string;
      targetProviderId: string;
    }[]
  ): Promise<(UserTokenModel | null)[]> {
    return Promise.all(
      data.map(
        async ({ startProviderUserId, startProviderId, targetProviderId }) => {
          const [startToken] = await this.get([
            {
              providerUserId: startProviderUserId,
              providerId: startProviderId,
            },
          ]);
          if (!startToken) return null;

          const [userTokens] = await this.getByUsers([
            startToken.internalUserId,
          ]);
          const targetToken = userTokens?.find(
            (token) => token.providerId === targetProviderId
          );
          return targetToken ?? null;
        }
      )
    );
  }

  async getByUsers(
    internalUserIds: string[]
  ): Promise<(UserTokenModel[] | null)[]> {
    return internalUserIds.map(
      (internalUserId) => this.storeByUserId.get(internalUserId) ?? null
    );
  }

  async upsert(tokenData: UserTokenModel[]): Promise<UserTokenMeta[]> {
    return tokenData.map(
      (token): UserTokenMeta => {
        const providerStore = this.getProviderStore(token.providerId);
        const { providerId, providerUserId, internalUserId } = token;
        providerStore.set(providerUserId, token);

        if (!this.storeByUserId.has(internalUserId)) {
          this.storeByUserId.set(internalUserId, []);
        }
        const userTokens = this.storeByUserId.get(internalUserId) || [];
        userTokens.push(token);

        return { internalUserId, providerId, providerUserId };
      }
    );
  }
}

export default LocalTokenStore;
