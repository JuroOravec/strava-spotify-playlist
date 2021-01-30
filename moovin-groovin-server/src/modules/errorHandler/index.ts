import ServerModule from '../../lib/ServerModule';

import createInstaller from './install';
import { ServerModuleName } from '../../types';

type ErrorHandlerModule = ServerModule;

const createErrorHandlerModule = (): ErrorHandlerModule =>
  new ServerModule({
    name: ServerModuleName.ERR_HANDLER,
    install: createInstaller(),
  });

export default createErrorHandlerModule;
export type { ErrorHandlerModule };
