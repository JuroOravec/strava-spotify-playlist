import defaults from 'lodash/defaults';

import type { PGStoreOptions } from '../../lib/PGStore';
import type { ConfigStore, UserConfig } from './types';

interface StoreConfigExternalData {
  clientConfig: PGStoreOptions;
  userConfig: UserConfig;
}

interface StoreConfigInternalData {
  configStore: ConfigStore | null;
}

type StoreConfigData = StoreConfigExternalData & StoreConfigInternalData;

const createDefaultUserConfig = (): UserConfig => ({
  playlistCollaborative: false,
  playlistPublic: false,
  // TODO: Ensure on user input that none of the templates include `this` as key, or invalid syntax like `{{ a..b }}`
  playlistTitleTemplate: '[Strava] {{activity.title}}',
  playlistDescriptionTemplate: [
    'Songs you listened to during your Strava {{activity.type}} on',
    '{{activity.date}}. See the activity at {{activity.url}}.',
    `Playlist created by {{meta.app}}.`,
  ].join(' '),
  activityDescriptionTemplate: [
    '{{activity.description}}',
    '',
    '{{playlist.tracklist}}',
    '',
    'See the playlist at {{playlist.url}}.',
    `Playlist created by {{meta.app}}.`,
  ].join('\n'),
});

const createStoreConfigData = (
  options: Partial<StoreConfigExternalData>
): StoreConfigData => {
  const { clientConfig = {}, userConfig: userConfigOverrides } = options;

  const defaultUserConfig = defaults(
    userConfigOverrides,
    createDefaultUserConfig()
  );

  return {
    ...options,
    clientConfig,
    configStore: null,
    userConfig: defaultUserConfig,
  };
};

export default createStoreConfigData;
export type { StoreConfigData, StoreConfigExternalData };
