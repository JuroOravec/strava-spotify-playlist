import type { QueryResultRow } from 'pg';
import uniqWith from 'lodash/uniqWith';
import isNil from 'lodash/isNil';

import logger from '../../../lib/logger';
import PGStore from '../../../lib/PGStore';
import alignResultWithInput from '../../../lib/PGStore/alignResultWithInput';
import type { UserTokenProviderInput } from '../../storeToken/types';
import type {
  UserStore,
  UserModel,
  UserMeta,
  UserInput,
  UserProviderAndEmailInput,
} from '../types';
import {
  getQueries,
  UserStoreSQLQueries,
  UserResponse,
  UserMetaResponse,
} from '../sql';

const transformUserMetaResponse = (user: UserMetaResponse): UserMeta => ({
  internalUserId: user.internal_user_id,
});

const transformUserResponse = (user: UserResponse): UserModel => ({
  ...transformUserMetaResponse(user as UserMetaResponse),
  nameDisplay: user.name_display,
  nameFamily: user.name_family,
  nameGiven: user.name_given,
  email: user.email,
  photo: user.photo,
  loginProvider: user.login_provider,
});

const dedupeUserInput = (userData: UserInput[]): UserInput[] => {
  // Dedupe by emails and keep the last version on conflict
  const dedupedReversed = uniqWith([...userData].reverse(), (userA, userB) =>
    Boolean(userA.email && userB.email && userA.email === userB.email)
  );
  return dedupedReversed.reverse();
};

const isUserResponse = (
  user: UserResponse | QueryResultRow
): user is UserResponse => !isNil(user?.internal_user_id);

class PGUserStore extends PGStore<UserStoreSQLQueries> implements UserStore {
  async doInstall(): Promise<void> {
    this.queries = await getQueries();
  }

  async delete(internalUserIds: string[]): Promise<(UserMeta | null)[]> {
    const { rows: ids } = await this.query(
      'deleteUsers',
      internalUserIds.map((id) => [id] as const),
      transformUserMetaResponse
    );

    return alignResultWithInput({
      input: { value: internalUserIds, alignBy: (id) => id },
      result: { value: ids, alignBy: (id) => id.internalUserId },
      missing: null,
    });
  }

  async get(internalUserIds: string[]): Promise<(UserModel | null)[]> {
    const { rows: users } = await this.query(
      'getUsers',
      internalUserIds.map((id) => [id] as const),
      (user) => (isUserResponse(user) ? transformUserResponse(user) : null)
    );

    return users;
  }

  async getByTokens(
    input: UserTokenProviderInput[]
  ): Promise<(UserModel | null)[]> {
    const { rows: users } = await this.query(
      'getUsersByTokens',
      input.map((d) => [d.providerUserId, d.providerId] as const),
      (user) => (isUserResponse(user) ? transformUserResponse(user) : null)
    );

    return users;
  }

  async getByTokensOrEmails(
    input: UserProviderAndEmailInput[]
  ): Promise<(UserModel | null)[]> {
    const { rows: users } = await this.query(
      'getUsersByTokensOrEmails',
      input.map((d) => [d.providerUserId, d.providerId, d.email] as const),
      (user) => (isUserResponse(user) ? transformUserResponse(user) : null)
    );

    return users;
  }

  async insert(userData: UserInput[]): Promise<(UserMeta | null)[]> {
    const values = dedupeUserInput(userData).map(
      (user) =>
        [
          user.internalUserId,
          user.email,
          user.photo,
          user.loginProvider,
          user.nameDisplay,
          user.nameFamily,
          user.nameGiven,
        ] as const
    );

    const { rows: ids } = await this.query(
      'insertUsers',
      values,
      transformUserMetaResponse
    );

    return alignResultWithInput({
      input: { value: userData, alignBy: (d) => d.internalUserId },
      result: { value: ids, alignBy: (id) => id.internalUserId },
      missing: null,
    });
  }
}

export default PGUserStore;
