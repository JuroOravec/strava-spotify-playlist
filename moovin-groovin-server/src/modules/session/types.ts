import type { ServerModules } from '../../lib/ServerModule';
import type { ServerModuleName } from '../../types';
import type { StoreSessionModule } from '../storeSession';
import type { StoreUserModule } from '../storeUser';

export interface SessionDeps extends ServerModules {
  [ServerModuleName.STORE_SESSION]: StoreSessionModule;
  [ServerModuleName.STORE_USER]: StoreUserModule;
}
