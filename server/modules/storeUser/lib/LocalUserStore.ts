import isNil from 'lodash/isNil';

import type {
  TokenStore,
  UserTokenProviderInput,
} from '../../storeToken/types';
import type { UserModel, UserInput, UserMeta, UserStore } from '../types';

class LocalUserStore implements UserStore {
  private store = new Map<string, UserModel>();

  constructor(private tokenStore: TokenStore) {}

  async install(): Promise<void> {}

  async close(): Promise<void> {
    this.store.clear();
  }

  async delete(internalUserIds: string[]): Promise<(UserMeta | null)[]> {
    return internalUserIds.map((internalUserId) => {
      if (!this.store.has(internalUserId)) return null;
      this.store.delete(internalUserId);
      return { internalUserId };
    });
  }

  async get(internalUserIds: string[]): Promise<(UserModel | null)[]> {
    return internalUserIds.map(
      (internalUserId) => this.store.get(internalUserId) || null
    );
  }

  async getByTokens(
    data: UserTokenProviderInput[]
  ): Promise<(UserModel | null)[]> {
    const userTokens = await this.tokenStore.get(data);
    return Promise.all(
      userTokens.map(async (token) => {
        if (isNil(token)) return null;
        const [user = null] = await this.get([token.internalUserId]);
        return user;
      })
    );
  }

  async insert(userData: UserInput[]): Promise<(UserMeta | null)[]> {
    return userData.map(
      (user): UserMeta => {
        this.store.set(user.internalUserId, user);
        return { internalUserId: user.internalUserId };
      }
    );
  }
}

export default LocalUserStore;
