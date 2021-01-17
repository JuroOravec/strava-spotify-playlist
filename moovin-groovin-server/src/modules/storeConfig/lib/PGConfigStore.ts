import type { QueryResultRow } from 'pg';
import uniqWith from 'lodash/uniqWith';
import isNil from 'lodash/isNil';

import logger from '../../../lib/logger';
import PGStore from '../../../lib/PGStore';
import alignResultWithInput from '../../../lib/PGStore/alignResultWithInput';
import type {
  ConfigStore,
  UserConfigModel,
  UserConfigMeta,
  UserConfigInput,
  UserConfigUpdateInput,
} from '../types';
import {
  getQueries,
  ConfigStoreSQLQueries,
  UserConfigResponse,
  UserConfigMetaResponse,
} from '../sql';

const transformUserConfigMetaResponse = (
  user: UserConfigMetaResponse
): UserConfigMeta => ({
  internalUserId: user.internal_user_id,
});

const transformUserConfigResponse = (
  config: UserConfigResponse
): UserConfigModel => ({
  ...transformUserConfigMetaResponse(config as UserConfigMetaResponse),
  playlistCollaborative: config.playlist_collaborative,
  playlistPublic: config.playlist_public,
  playlistDescriptionTemplate: config.playlist_description_template ?? null,
  playlistTitleTemplate: config.playlist_title_template ?? null,
  activityDescriptionTemplate: config.activity_description_template ?? null,
});

const dedupeUserConfigInput = <T extends UserConfigMeta>(
  configData: T[]
): T[] => {
  const dedupedReversed = uniqWith(
    [...configData].reverse(),
    (configA, configB) => configA.internalUserId === configB.internalUserId
  );
  return dedupedReversed.reverse();
};

const isUserConfigResponse = (
  config: UserConfigResponse | QueryResultRow
): config is UserConfigResponse =>
  !isNil(config?.internal_user_id) && !isNil(config?.playlist_public);

class PGConfigStore
  extends PGStore<ConfigStoreSQLQueries>
  implements ConfigStore {
  async doInstall(): Promise<void> {
    this.queries = await getQueries();
    await this.query('createUserConfigTable');
  }

  async get(internalUserIds: string[]): Promise<(UserConfigModel | null)[]> {
    const { rows: configs } = await this.query(
      'getUserConfigs',
      internalUserIds.map((val) => [val] as const),
      (config) =>
        isUserConfigResponse(config)
          ? transformUserConfigResponse(config)
          : null
    );

    return configs;
  }

  async insert(configs: UserConfigInput[]): Promise<(UserConfigMeta | null)[]> {
    const values = dedupeUserConfigInput(configs).map(
      (config) =>
        [
          config.internalUserId,
          config.playlistCollaborative,
          config.playlistPublic,
          config.playlistDescriptionTemplate,
          config.playlistTitleTemplate,
          config.activityDescriptionTemplate,
        ] as const
    );

    const { rows: ids } = await this.query(
      'insertUserConfigs',
      values,
      transformUserConfigMetaResponse
    );

    return alignResultWithInput({
      input: { value: configs, alignBy: (c) => c.internalUserId },
      result: { value: ids, alignBy: (r) => r.internalUserId },
      missing: null,
    });
  }

  async update(
    configs: UserConfigUpdateInput[]
  ): Promise<(UserConfigMeta | null)[]> {
    const values = dedupeUserConfigInput(configs).map(
      (config) =>
        [
          config.internalUserId,
          config.playlistCollaborative,
          config.playlistPublic,
          config.playlistDescriptionTemplate,
          config.playlistTitleTemplate,
          config.activityDescriptionTemplate,
        ] as const
    );

    const { rows: ids } = await this.query(
      'updateUserConfigs',
      values,
      transformUserConfigMetaResponse
    );

    return alignResultWithInput({
      input: { value: configs, alignBy: (c) => c.internalUserId },
      result: { value: ids, alignBy: (r) => r.internalUserId },
      missing: null,
    });
  }
}

export default PGConfigStore;
