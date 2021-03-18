import ServerModule, { Handlers } from '../../lib/ServerModule';
import { ServerModuleName, SetRequiredFields } from '../../types';
import createInstaller from './install';
import createCloser from './close';
import createServices, { ApiAppleMusicServices } from './services';
import type { ApiAppleMusicData, ApiAppleMusicExternalData } from './data';
import type { ApiAppleMusicDeps } from './types';

type ApiAppleMusicModuleOptions = SetRequiredFields<
  ApiAppleMusicExternalData,
  'clientId' | 'clientSecret'
>;
type ApiAppleMusicModule = ServerModule<
  ApiAppleMusicServices,
  Handlers,
  ApiAppleMusicData,
  ApiAppleMusicDeps
>;

const createApiAppleMusicModule = (
  options: ApiAppleMusicModuleOptions
): ApiAppleMusicModule =>
  new ServerModule({
    name: ServerModuleName.API_APPLEMUSIC,
    install: createInstaller(),
    close: createCloser(),
    services: createServices(),
    data: {
      ...options,
      applemusic: null,
    },
  });

export default createApiAppleMusicModule;
export type { ApiAppleMusicModule, ApiAppleMusicModuleOptions };
