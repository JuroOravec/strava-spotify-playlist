import type AppServerModules from '../../types/AppServerModules';
import type { ServerModuleName } from '../../types';
import type { UserModel } from '../storeUser/types';

export type SessionDeps = Pick<
  AppServerModules,
  ServerModuleName.STORE_SESSION | ServerModuleName.STORE_USER
>;

// Set req.user to  the type that we resolve our user to
declare global {
  /* eslint-disable-next-line @typescript-eslint/no-namespace */
  namespace Express {
    /* eslint-disable-next-line @typescript-eslint/no-empty-interface */
    interface User extends UserModel {}
  }
}
