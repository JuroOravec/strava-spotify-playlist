import ServerModule, { Handlers } from '../../lib/ServerModule';
import { ServerModuleName } from '../../types';
import createInstaller from './install';
import createCloser from './close';
import createServices, { PlaylistServices } from './services';
import type { PlaylistData, PlaylistExternalOptions } from './data';

type PlaylistModuleOptions = PlaylistExternalOptions;

type PlaylistModule = ServerModule<PlaylistServices, Handlers, PlaylistData>;

const createStravaWebhookModule = (
  options: PlaylistModuleOptions
): PlaylistModule => {
  const { appNamePublic } = options;

  return new ServerModule({
    name: ServerModuleName.PLAYLIST,
    install: createInstaller(),
    close: createCloser(),
    services: createServices(),
    data: {
      ...options,
      templateFormater: null,
      appNamePublic,
    },
  });
};

export default createStravaWebhookModule;
export type { PlaylistModule, PlaylistModuleOptions };
