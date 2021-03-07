import type { QueryResultRow } from 'pg';
import uniqWith from 'lodash/uniqWith';
import isNil from 'lodash/isNil';
import groupBy from 'lodash/groupBy';

import logger from '../../../lib/logger';
import PGStore from '../../../lib/PGStore';
import type {
  TokenStore,
  UserTokenModel,
  UserTokenMeta,
  UserTokenProviderInput,
  UserTokenProviderAndUserInput,
} from '../types';
import {
  UserTokenMetaResponse,
  UserTokenResponse,
  getQueries,
  TokenStoreSQLQueries,
} from '../sql';
import alignResultWithInput from '../../../lib/PGStore/alignResultWithInput';
import areUserTokensEqual from '../utils/areUserTokensEqual';

const transformAuthTokenMetaResponse = (
  token: UserTokenMetaResponse
): UserTokenMeta => ({
  internalUserId: token.internal_user_id,
  providerUserId: token.provider_user_id,
  providerId: token.provider_id,
});

const transformAuthTokenResponse = (
  token: UserTokenResponse
): UserTokenModel => ({
  ...transformAuthTokenMetaResponse(token as UserTokenMetaResponse),
  accessToken: token.access_token,
  refreshToken: token.refresh_token,
  expiresAt: Number.parseInt(token.expires_at as any),
  scope: token.scope,
});

const dedupeAuthToken = (tokenData: UserTokenModel[]): UserTokenModel[] =>
  uniqWith(tokenData, areUserTokensEqual);

const isUserTokenResponse = (
  token: UserTokenResponse | QueryResultRow
): token is UserTokenResponse =>
  !isNil(token?.internal_user_id) &&
  !isNil(token?.provider_user_id) &&
  !isNil(token?.provider_id);

class PGTokenStore extends PGStore<TokenStoreSQLQueries> implements TokenStore {
  async doInstall(): Promise<void> {
    this.queries = await getQueries();
  }

  async delete(
    tokenData: UserTokenProviderInput[]
  ): Promise<(UserTokenMeta | null)[]> {
    const { rows: ids } = await this.query(
      'deleteTokens',
      tokenData.map(
        (token) => [token.providerUserId, token.providerId] as const
      ),
      transformAuthTokenMetaResponse
    );

    const serializeKey = (d: UserTokenProviderInput) =>
      `${d.providerUserId}__${d.providerId}`;

    return alignResultWithInput({
      input: { value: tokenData, alignBy: serializeKey },
      result: { value: ids, alignBy: serializeKey },
      missing: null,
    });
  }

  async deleteByUsersAndProviders(
    tokenData: UserTokenProviderAndUserInput[]
  ): Promise<(UserTokenMeta | null)[]> {
    const { rows: ids } = await this.query(
      'deleteTokensByUsersAndProviders',
      tokenData.map(
        (token) => [token.internalUserId, token.providerId] as const
      ),
      transformAuthTokenMetaResponse
    );

    const serializeKey = (d: UserTokenProviderAndUserInput) =>
      `${d.internalUserId}__${d.providerId}`;

    return alignResultWithInput({
      input: { value: tokenData, alignBy: serializeKey },
      result: { value: ids, alignBy: serializeKey },
      missing: null,
    });
  }

  async get(
    data: UserTokenProviderInput[]
  ): Promise<(UserTokenModel | null)[]> {
    const { rows: tokens } = await this.query(
      'getTokens',
      data.map(
        ({ providerUserId, providerId }) =>
          [providerUserId, providerId] as const
      ),
      (token) =>
        isUserTokenResponse(token) ? transformAuthTokenResponse(token) : null
    );

    return tokens;
  }

  async getByProviders(
    providerIds: string[]
  ): Promise<(UserTokenModel[] | null)[]> {
    const { rows: tokens } = await this.query(
      'getTokensByProviders',
      providerIds.map((id) => [id] as const),
      transformAuthTokenResponse
    );

    const groups = Object.entries(
      groupBy(tokens, (val) => (isNil(val) ? 'null' : val.providerId))
    );

    return alignResultWithInput({
      input: { value: providerIds, alignBy: (id) => id },
      result: { value: groups, alignBy: ([key]) => key },
      missing: null,
    }).map((keyValOrNull) => (keyValOrNull ? keyValOrNull[1] : null));
  }

  async getByTokens(
    data: {
      startProviderUserId: string;
      startProviderId: string;
      targetProviderId: string;
    }[]
  ): Promise<(UserTokenModel | null)[]> {
    const { rows: tokens } = await this.query(
      'getTokensByTokens',
      data.map(
        (input) =>
          [
            input.startProviderUserId,
            input.startProviderId,
            input.targetProviderId,
          ] as const
      ),
      (token) =>
        isUserTokenResponse(token) ? transformAuthTokenResponse(token) : null
    );

    return alignResultWithInput({
      input: { value: data, alignBy: (d) => d.targetProviderId },
      result: { value: tokens, alignBy: (token) => token?.providerId ?? '' },
      missing: null,
    }).map((keyValOrNull) => (keyValOrNull ? keyValOrNull : null));
  }

  async getByUsers(
    internalUserIds: string[]
  ): Promise<(UserTokenModel[] | null)[]> {
    const { rows: tokens } = await this.query(
      'getTokensByUsers',
      internalUserIds.map((id) => [id] as const),
      transformAuthTokenResponse
    );

    // Split results by users
    const groups = Object.entries(groupBy(tokens, (val) => val.internalUserId));

    return alignResultWithInput({
      input: { value: internalUserIds, alignBy: (id) => id.toString() },
      result: { value: groups, alignBy: ([key]) => key },
      missing: null,
    }).map((keyValOrNull) => (keyValOrNull ? keyValOrNull[1] : null));
  }

  async upsert(tokenData: UserTokenModel[]): Promise<(UserTokenMeta | null)[]> {
    const values = dedupeAuthToken(tokenData).map(
      (token) =>
        [
          token.internalUserId,
          token.providerUserId,
          token.providerId,
          token.expiresAt,
          token.accessToken,
          token.refreshToken,
          token.scope,
        ] as const
    );

    const { rows: ids } = await this.query(
      'upsertTokens',
      values,
      transformAuthTokenMetaResponse
    );

    const serializeKey = (d: UserTokenMeta) =>
      `${d.providerUserId}__${d.providerId}`;

    return alignResultWithInput({
      input: { value: tokenData, alignBy: serializeKey },
      result: { value: ids, alignBy: serializeKey },
      missing: null,
    });
  }
}

export default PGTokenStore;
export { transformAuthTokenResponse };
