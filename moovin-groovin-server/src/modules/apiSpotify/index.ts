import ServerModule, { Handlers } from '../../lib/ServerModule';
import { ServerModuleName, SetRequiredFields } from '../../types';
import createInstaller from './install';
import createCloser from './close';
import createServices, { ApiSpotifyServices } from './services';
import type { ApiSpotifyData, ApiSpotifyExternalData } from './data';
import type { ApiSpotifyDeps } from './types';

type ApiSpotifyModuleOptions = SetRequiredFields<
  ApiSpotifyExternalData,
  'clientId' | 'clientSecret'
>;
type ApiSpotifyModule = ServerModule<
  ApiSpotifyServices,
  Handlers,
  ApiSpotifyData,
  ApiSpotifyDeps
>;

const createApiSpotifyModule = (
  options: ApiSpotifyModuleOptions
): ApiSpotifyModule =>
  new ServerModule({
    name: ServerModuleName.API_SPOTIFY,
    install: createInstaller(),
    close: createCloser(),
    services: createServices(),
    data: {
      ...options,
      spotify: null,
    },
  });

export default createApiSpotifyModule;
export type { ApiSpotifyModule, ApiSpotifyModuleOptions };
