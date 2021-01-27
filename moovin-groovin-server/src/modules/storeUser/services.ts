import zip from 'lodash/zip';

import logger from '../../lib/logger';
import {
  assertContext,
  Handlers,
  ServerModule,
  Services,
} from '../../lib/ServerModule';
import type { StoreTokenModule } from '../storeToken';
import type { AuthToken, UserTokenProviderInput } from '../storeToken/types';
import type {
  UserModel,
  UserInput,
  UserMeta,
  UserProviderAndEmailInput,
} from './types';
import type { StoreUserData } from './data';
import assertUserStore from './utils/assertUserStore';

interface StoreUserServices extends Services {
  deleteUser: (internalUserId: string) => Promise<UserMeta | null>;
  deleteUsers: (internalUserIds: string[]) => Promise<(UserMeta | null)[]>;
  getUser: (internalUserId: string) => Promise<UserModel | null>;
  getUsers: (internalUserIds: string[]) => Promise<(UserModel | null)[]>;
  getUserByToken: (data: UserTokenProviderInput) => Promise<UserModel | null>;
  getUsersByTokens: (
    data: UserTokenProviderInput[]
  ) => Promise<(UserModel | null)[]>;
  getUserByTokenOrEmail: (
    data: UserProviderAndEmailInput
  ) => Promise<UserModel | null>;
  getUsersByTokensOrEmails: (
    data: UserProviderAndEmailInput[]
  ) => Promise<(UserModel | null)[]>;
  createUser: (user: UserInput & { tokens?: AuthToken[] }) => Promise<UserMeta>;
  createUsers: (
    users: (UserInput & { tokens?: AuthToken[] })[]
  ) => Promise<UserMeta[]>;
}

type ThisModule = ServerModule<
  StoreUserServices,
  Handlers,
  StoreUserData,
  { storeToken: StoreTokenModule }
>;

const createStoreUserServices = (): StoreUserServices => {
  async function deleteUser(
    this: ThisModule,
    internalUserId: string
  ): Promise<UserMeta | null> {
    const [userResponse = null] = await this.services.deleteUsers([
      internalUserId,
    ]);
    return userResponse;
  }

  async function deleteUsers(
    this: ThisModule,
    internalUserIds: string[]
  ): Promise<(UserMeta | null)[]> {
    assertUserStore(this.data.userStore);
    return this.data.userStore.delete(internalUserIds);
  }

  async function getUser(
    this: ThisModule,
    internalUserId: string
  ): Promise<UserModel | null> {
    const [userResponse = null] = await this.services.getUsers([
      internalUserId,
    ]);
    return userResponse;
  }

  async function getUsers(
    this: ThisModule,
    internalUserIds: string[]
  ): Promise<(UserModel | null)[]> {
    assertUserStore(this.data.userStore);
    return this.data.userStore.get(internalUserIds);
  }

  async function getUserByToken(
    this: ThisModule,
    data: UserTokenProviderInput
  ): Promise<UserModel | null> {
    const [userResponse = null] = await this.services.getUsersByTokens([data]);
    return userResponse;
  }

  async function getUsersByTokens(
    this: ThisModule,
    data: UserTokenProviderInput[]
  ): Promise<(UserModel | null)[]> {
    assertUserStore(this.data.userStore);
    return this.data.userStore.getByTokens(data);
  }

  async function getUserByTokenOrEmail(
    this: ThisModule,
    data: UserProviderAndEmailInput
  ): Promise<UserModel | null> {
    const [userResponse = null] = await this.services.getUsersByTokensOrEmails([
      data,
    ]);
    return userResponse;
  }

  async function getUsersByTokensOrEmails(
    this: ThisModule,
    data: UserProviderAndEmailInput[]
  ): Promise<(UserModel | null)[]> {
    assertUserStore(this.data.userStore);
    return this.data.userStore.getByTokensOrEmails(data);
  }

  async function createUser(
    this: ThisModule,
    user: UserInput & { tokens?: AuthToken[] }
  ): Promise<UserMeta> {
    const [userResponse] = await this.services.createUsers([user]);

    if (!userResponse) {
      throw Error('Failed to create a user');
    }

    return userResponse;
  }

  async function createUsers(
    this: ThisModule,
    users: (UserInput & { tokens?: AuthToken[] })[]
  ): Promise<UserMeta[]> {
    assertUserStore(this.data.userStore);
    const userResponses = await this.data.userStore.insert(users);

    return Promise.all(
      zip(users, userResponses).map(async ([user, userResponse]) => {
        if (!userResponse || !user) {
          throw Error('Failed to create a user');
        }

        if (user.tokens?.length) {
          assertContext(this.context);
          const { internalUserId } = userResponse;
          await this.context.modules.storeToken.services.upsertTokens(
            user.tokens.map((token) => ({
              ...token,
              internalUserId,
            }))
          );
        }

        return userResponse;
      })
    );
  }

  return {
    deleteUser,
    deleteUsers,
    getUser,
    getUsers,
    getUserByToken,
    getUsersByTokens,
    getUserByTokenOrEmail,
    getUsersByTokensOrEmails,
    createUser,
    createUsers,
  };
};

export { createStoreUserServices as default, StoreUserServices };
