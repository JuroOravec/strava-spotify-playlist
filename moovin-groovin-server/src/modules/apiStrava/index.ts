import ServerModule, { Handlers } from '../../lib/ServerModule';
import { ServerModuleName } from '../../types';
import createInstaller from './install';
import createServices, { ApiStravaServices } from './services';
import { ApiStravaData, ApiStravaExternalData } from './data';

type ApiStravaModuleOptions = Partial<ApiStravaExternalData>;
type ApiStravaModule = ServerModule<ApiStravaServices, Handlers, ApiStravaData>;

const createApiStravaModule = (
  options: ApiStravaModuleOptions = {}
): ApiStravaModule =>
  new ServerModule({
    name: ServerModuleName.API_STRAVA,
    install: createInstaller(),
    services: createServices(),
    data: { ...options },
  });

export default createApiStravaModule;
export type { ApiStravaModule, ApiStravaModuleOptions };
