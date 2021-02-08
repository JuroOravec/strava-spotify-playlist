import type { QueryResultRow } from 'pg';

import type { OptionalReadonly } from '@moovin-groovin/shared';
import type { PGQueries } from '../../../lib/PGStore';
import loadFilesFromDir from '../../../utils/loadFilesFromDir';
import type { UserConfigModel, UserConfigMeta } from '../types';

interface UserConfigResponse {
  internal_user_id: UserConfigModel['internalUserId'];
  playlist_collaborative: UserConfigModel['playlistCollaborative'];
  playlist_public: UserConfigModel['playlistPublic'];
  playlist_auto_create: UserConfigModel['playlistAutoCreate'];
  playlist_description_template: UserConfigModel['playlistDescriptionTemplate'];
  playlist_title_template: UserConfigModel['playlistTitleTemplate'];
  activity_description_enabled: UserConfigModel['activityDescriptionEnabled'];
  activity_description_template: UserConfigModel['activityDescriptionTemplate'];
}

interface UserConfigMetaResponse {
  internal_user_id: UserConfigMeta['internalUserId'];
}

interface ConfigStoreSQLQueries extends PGQueries {
  createUserConfigTable: [[], QueryResultRow];
  getUserConfigs: [
    OptionalReadonly<[UserConfigResponse['internal_user_id']]>[],
    UserConfigResponse
  ];
  insertUserConfigs: [
    OptionalReadonly<
      [
        UserConfigResponse['internal_user_id'],
        UserConfigResponse['playlist_collaborative'],
        UserConfigResponse['playlist_public'],
        UserConfigResponse['playlist_auto_create'],
        UserConfigResponse['playlist_description_template'],
        UserConfigResponse['playlist_title_template'],
        UserConfigResponse['activity_description_enabled'],
        UserConfigResponse['activity_description_template']
      ]
    >[],
    UserConfigMetaResponse
  ];
  updateUserConfigs: [
    OptionalReadonly<
      [
        UserConfigResponse['internal_user_id'],
        UserConfigResponse['playlist_collaborative'] | undefined,
        UserConfigResponse['playlist_public'] | undefined,
        UserConfigResponse['playlist_auto_create'] | undefined,
        UserConfigResponse['playlist_description_template'] | undefined,
        UserConfigResponse['playlist_title_template'] | undefined,
        UserConfigResponse['activity_description_enabled'] | undefined,
        UserConfigResponse['activity_description_template'] | undefined
      ]
    >[],
    UserConfigMetaResponse
  ];
}

const getQueries = async (): Promise<
  Record<keyof ConfigStoreSQLQueries, string>
> => loadFilesFromDir(__dirname, ['.pgsql']);

export {
  getQueries,
  ConfigStoreSQLQueries,
  UserConfigResponse,
  UserConfigMetaResponse,
};
