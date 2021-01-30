import ServerModule, { Handlers } from '../../lib/ServerModule';
import { ServerModuleName, SetRequiredFields } from '../../types';
import createInstaller from './install';
import createCloser from './close';
import createSpotifyServices, { SpotifyServices } from './services';
import type { SpotifyData, SpotifyExternalData } from './data';
import type { SpotifyDeps } from './types';

type SpotifyModuleOptions = SetRequiredFields<
  SpotifyExternalData,
  'clientId' | 'clientSecret'
>;
type SpotifyModule = ServerModule<
  SpotifyServices,
  Handlers,
  SpotifyData,
  SpotifyDeps
>;

const createSpotifyModule = (options: SpotifyModuleOptions): SpotifyModule =>
  new ServerModule({
    name: ServerModuleName.SPOTIFY,
    install: createInstaller(),
    close: createCloser(),
    services: createSpotifyServices(),
    data: {
      ...options,
      spotify: null,
    },
  });

export default createSpotifyModule;
export type { SpotifyModule, SpotifyModuleOptions };
