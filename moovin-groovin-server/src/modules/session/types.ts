import type { ServerModules } from '../../lib/ServerModule';
import type { ServerModuleName } from '../../types';
import type { StoreSessionModule } from '../storeSession';

export interface SessionDeps extends ServerModules {
  [ServerModuleName.STORE_SESSION]: StoreSessionModule;
}
