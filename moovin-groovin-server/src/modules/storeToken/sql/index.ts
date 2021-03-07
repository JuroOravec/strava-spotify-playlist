import type { QueryResultRow } from 'pg';

import type { OptionalReadonly } from '@moovin-groovin/shared';
import type { PGQueries } from '../../../lib/PGStore';
import loadFilesFromDir from '../../../utils/loadFilesFromDir';
import type { UserTokenModel, UserTokenMeta } from '../types';

interface UserTokenResponse {
  internal_user_id: UserTokenModel['internalUserId'];
  provider_user_id: UserTokenModel['providerUserId'];
  provider_id: UserTokenModel['providerId'];
  access_token: UserTokenModel['accessToken'];
  refresh_token: UserTokenModel['refreshToken'];
  expires_at: UserTokenModel['expiresAt'];
  scope: UserTokenModel['scope'];
}

interface UserTokenMetaResponse {
  internal_user_id: UserTokenModel['internalUserId'];
  provider_user_id: UserTokenMeta['providerUserId'];
  provider_id: UserTokenMeta['providerId'];
}

interface TokenStoreSQLQueries extends PGQueries {
  deleteTokens: [
    OptionalReadonly<
      [UserTokenResponse['provider_user_id'], UserTokenResponse['provider_id']]
    >[],
    UserTokenMetaResponse
  ];
  deleteTokensByUsersAndProviders: [
    OptionalReadonly<
      [UserTokenResponse['internal_user_id'], UserTokenResponse['provider_id']]
    >[],
    UserTokenMetaResponse
  ];
  getTokens: [
    OptionalReadonly<
      [UserTokenResponse['provider_user_id'], UserTokenResponse['provider_id']]
    >[],
    UserTokenResponse | QueryResultRow
  ];
  getTokensByProviders: [
    OptionalReadonly<[UserTokenResponse['provider_id']]>[],
    UserTokenResponse
  ];
  getTokensByTokens: [
    OptionalReadonly<
      [
        UserTokenResponse['provider_user_id'],
        UserTokenResponse['provider_id'],
        UserTokenResponse['provider_id']
      ]
    >[],
    UserTokenResponse | QueryResultRow
  ];
  getTokensByUsers: [
    OptionalReadonly<[UserTokenResponse['internal_user_id']]>[],
    UserTokenResponse
  ];
  upsertTokens: [
    OptionalReadonly<
      [
        UserTokenResponse['internal_user_id'],
        UserTokenResponse['provider_user_id'],
        UserTokenResponse['provider_id'],
        UserTokenResponse['expires_at'],
        UserTokenResponse['access_token'],
        UserTokenResponse['refresh_token'],
        UserTokenResponse['scope'] | undefined
      ]
    >[],
    UserTokenMetaResponse
  ];
}

const getQueries = async (): Promise<
  Record<keyof TokenStoreSQLQueries, string>
> => loadFilesFromDir(__dirname, ['.pgsql']);

export {
  getQueries,
  TokenStoreSQLQueries,
  UserTokenResponse,
  UserTokenMetaResponse,
};
