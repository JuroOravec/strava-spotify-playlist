import ServerModule, { Handlers } from '../../lib/ServerModule';
import { ServerModuleName } from '../../types';
import createInstaller from './install';
import createServices, { StravaServices } from './services';
import { StravaData, StravaExternalData } from './data';

type StravaModuleOptions = Partial<StravaExternalData>;
type StravaModule = ServerModule<StravaServices, Handlers, StravaData>;

const createStravaModule = (options: StravaModuleOptions = {}): StravaModule =>
  new ServerModule({
    name: ServerModuleName.STRAVA,
    install: createInstaller(),
    services: createServices(),
    data: { ...options },
  });

export default createStravaModule;
export type { StravaModule, StravaModuleOptions };
