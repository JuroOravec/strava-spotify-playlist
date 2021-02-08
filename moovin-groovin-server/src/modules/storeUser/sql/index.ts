import type { QueryResultRow } from 'pg';

import type { OptionalReadonly } from '@moovin-groovin/shared';
import type { PGQueries } from '../../../lib/PGStore';
import loadFilesFromDir from '../../../utils/loadFilesFromDir';
import type { UserTokenResponse } from '../../storeToken/sql';
import type { UserModel, UserMeta } from '../types';

interface UserResponse {
  internal_user_id: UserModel['internalUserId'];
  name_display: UserModel['nameDisplay'];
  name_family: UserModel['nameFamily'];
  name_given: UserModel['nameGiven'];
  email: UserModel['email'];
  photo: UserModel['photo'];
  login_provider: UserModel['loginProvider'];
}

interface UserMetaResponse {
  internal_user_id: UserMeta['internalUserId'];
}

interface UserStoreSQLQueries extends PGQueries {
  createUserTable: [[], QueryResultRow];
  deleteUsers: [
    OptionalReadonly<[UserResponse['internal_user_id']]>[],
    UserMetaResponse
  ];
  getUsers: [
    OptionalReadonly<[UserResponse['internal_user_id']]>[],
    UserResponse | QueryResultRow
  ];
  getUsersByTokens: [
    OptionalReadonly<
      [UserTokenResponse['provider_user_id'], UserTokenResponse['provider_id']]
    >[],
    UserResponse | QueryResultRow
  ];
  getUsersByTokensOrEmails: [
    OptionalReadonly<
      [
        UserTokenResponse['provider_user_id'],
        UserTokenResponse['provider_id'],
        UserResponse['email']
      ]
    >[],
    UserResponse | QueryResultRow
  ];
  insertUsers: [
    OptionalReadonly<
      [
        UserResponse['internal_user_id'],
        UserResponse['email'],
        UserResponse['photo'],
        UserResponse['login_provider'],
        UserResponse['name_display'],
        UserResponse['name_family'],
        UserResponse['name_given']
      ]
    >[],
    UserMetaResponse
  ];
}

const getQueries = async (): Promise<
  Record<keyof UserStoreSQLQueries, string>
> => loadFilesFromDir(__dirname, ['.pgsql']);

export {
  getQueries,
  UserStoreSQLQueries,
  UserResponse,
  UserMetaResponse,
  UserTokenResponse,
};
