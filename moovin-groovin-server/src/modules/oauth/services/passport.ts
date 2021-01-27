import { v4 as genUuid } from 'uuid';

import logger from '../../../lib/logger';
import ServerModule, {
  assertContext,
  Data,
  Handlers,
  Services,
} from '../../../lib/ServerModule';
import type { UserModel } from '../../storeUser/types';
import type { AuthToken, UserTokenMeta } from '../../storeToken/types';
import type { OAuthDeps } from '../types';

type UserInfo = Omit<UserModel, 'internalUserId' | 'loginProvider'>;

interface OAuthPassportServices extends Services {
  processLoginProviderToken: (
    token: AuthToken,
    userInfo?: UserInfo
  ) => Promise<UserModel>;
  processIntegrationProviderToken: (
    token: AuthToken,
    internalUserId?: string,
    isAuthenticated?: boolean
  ) => Promise<UserTokenMeta | null>;
}

type ThisModule = ServerModule<
  OAuthPassportServices,
  Handlers,
  Data,
  OAuthDeps
>;

const createOAuthPassportServices = (): OAuthPassportServices => {
  async function processLoginProviderToken(
    this: ThisModule,
    token: AuthToken,
    userInfo: UserInfo = {}
  ): Promise<UserModel> {
    assertContext(this.context);
    const {
      getUserByToken,
      getUserByTokenOrEmail,
      createUser,
    } = this.context.modules.storeUser.services;

    let user = await (userInfo.email
      ? getUserByTokenOrEmail({
          providerId: token.providerId,
          providerUserId: token.providerUserId,
          email: userInfo.email,
        })
      : getUserByToken({
          providerId: token.providerId,
          providerUserId: token.providerUserId,
        }));

    if (!user) {
      user = {
        ...userInfo,
        internalUserId: genUuid(),
        loginProvider: token.providerId,
      };
      await createUser({ ...user, tokens: [token] });
    }

    return user;
  }

  async function processIntegrationProviderToken(
    this: ThisModule,
    token: AuthToken,
    internalUserId?: string,
    isAuthenticated?: boolean
  ): Promise<UserTokenMeta | null> {
    assertContext(this.context);

    if (!isAuthenticated || !internalUserId) {
      throw new Error(
        'Not authenticated. Cannot add integration to unknown user.'
      );
    }

    assertContext(this.context);
    const { upsertToken } = this.context.modules.storeToken.services;
    return upsertToken({
      ...token,
      internalUserId,
    });
  }

  return {
    processLoginProviderToken,
    processIntegrationProviderToken,
  };
};

export { createOAuthPassportServices as default, OAuthPassportServices };
