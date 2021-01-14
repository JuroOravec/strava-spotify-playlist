import ServerModule, { Handlers } from '../../lib/ServerModule';
import { ServerModuleName } from '../../types';
import createInstaller from './install';
import createCloser from './close';
import createServices, { StravaSpotifyServices } from './services';
import type { StravaSpotifyData, StravaSpotifyExternalOptions } from './data';

type StravaSpotifyModuleOptions = StravaSpotifyExternalOptions;

type StravaSpotifyModule = ServerModule<
  StravaSpotifyServices,
  Handlers,
  StravaSpotifyData
>;

const createStravaWebhookModule = (
  options: StravaSpotifyModuleOptions
): StravaSpotifyModule => {
  const { appNamePublic } = options;

  return new ServerModule({
    name: ServerModuleName.STRAVA_SPOTIFY,
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

export {
  createStravaWebhookModule as default,
  StravaSpotifyModule,
  StravaSpotifyModuleOptions,
};
