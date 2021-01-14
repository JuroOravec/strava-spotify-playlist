import isNil from 'lodash/isNil';
import { v4 as genUuid } from 'uuid';

import logger from '../../../lib/logger';
import ServerModule, {
  assertContext,
  Data,
  Handlers,
  Services,
} from '../../../lib/ServerModule';
import type { UserModel } from '../../storeUser/types';
import type { AuthToken } from '../../storeToken/types';
import type { OAuthDeps, PassportUser } from '../types';

type UserInfo = Omit<UserModel, 'internalUserId' | 'loginProvider'>;

interface OAuthPassportServices extends Services {
  processLoginProviderPassportToken: (
    token: AuthToken,
    userInfo?: UserInfo
  ) => Promise<PassportUser>;
  validatePassportUser: (
    internalUserId: string,
    passportUser: PassportUser
  ) => Promise<void>;
}

type ThisModule = ServerModule<
  OAuthPassportServices,
  Handlers,
  Data,
  OAuthDeps
>;

const createOAuthPassportServices = (): OAuthPassportServices => {
  async function processLoginProviderPassportToken(
    this: ThisModule,
    token: AuthToken,
    userInfo: UserInfo = {}
  ): Promise<PassportUser> {
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

    return {
      user,
      token,
    };
  }

  async function validatePassportUser(
    this: ThisModule,
    internalUserId: string,
    passportUser: PassportUser
  ): Promise<void> {
    if (isNil(internalUserId)) {
      throw Error('No user ID found. Cannot authenticate unknown user.');
    }

    assertContext(this.context);

    // Check if userID refers to existing user.
    const { getUser } = this.context.modules.storeUser.services;
    const user = await getUser(internalUserId);

    if (!user) {
      throw Error('Invalid user ID.');
    }

    const { user: verifiedUser } = passportUser;
    if (
      !isNil(verifiedUser.internalUserId) &&
      verifiedUser.internalUserId !== user.internalUserId
    ) {
      // Some user has logged in, but different one than we expected by the userId.
      throw Error('Invalid user ID.');
    }
  }

  return {
    processLoginProviderPassportToken,
    validatePassportUser,
  };
};

export { createOAuthPassportServices as default, OAuthPassportServices };
