import type { ServerModules } from '../../lib/ServerModule';
import type { ServerModuleName } from '../../types';
import type { StoreSessionModule } from '../storeSession';
import type { StoreUserModule } from '../storeUser';
import type { UserModel } from '../storeUser/types';

export interface SessionDeps extends ServerModules {
  [ServerModuleName.STORE_SESSION]: StoreSessionModule;
  [ServerModuleName.STORE_USER]: StoreUserModule;
}

// Set req.user to  the type that we resolve our user to
declare global {
  /* eslint-disable-next-line @typescript-eslint/no-namespace */
  namespace Express {
    /* eslint-disable-next-line @typescript-eslint/no-empty-interface */
    interface User extends UserModel {}
  }
}
