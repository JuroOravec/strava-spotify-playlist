import capitalize from 'lodash/capitalize';

import { ServerModuleName } from '../../../types';
import type { PlaylistSpotifyModule } from '../../../modules/playlistSpotify';
import type AppServerModules from '../../../types/AppServerModules';

// TODO: Pass playlist providers to playlist module via options
const resolvePlaylistModuleService = <T extends string>(input: {
  modules: Partial<AppServerModules>;
  providerId: string;
  service: T;
}): PlaylistSpotifyModule['services'][T] => {
  const { modules, providerId, service: serviceName } = input;

  const playlistModule =
    modules[
      `playlist${capitalize(providerId)}` as ServerModuleName.PLAYLIST_SPOTIFY
    ];

  if (!playlistModule) {
    throw Error(`No module exists for playlist providerId "${providerId}"`);
  }

  const service = playlistModule.services?.[serviceName];

  if (!service) {
    throw Error(
      `Service method "${serviceName}" in module "${providerId}" is not implemented`
    );
  }

  return service;
};

export default resolvePlaylistModuleService;
