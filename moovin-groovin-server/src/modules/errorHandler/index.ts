import ServerModule, { Handlers, Services } from '../../lib/ServerModule';

import createInstaller from './install';
import { ServerModuleName } from '../../types';
import type { ErrorHandlerData, ErrorHandlerExternalData } from './data';

type BaseModuleOptions = Partial<ErrorHandlerExternalData>;
type ErrorHandlerModule = ServerModule<Services, Handlers, ErrorHandlerData>;

const createErrorHandlerModule = (
  options: BaseModuleOptions = {}
): ErrorHandlerModule => {
  const { sentry = {}, sentryRequestHandler = {} } = options;

  return new ServerModule({
    name: ServerModuleName.ERR_HANDLER,
    install: createInstaller(),
    data: {
      sentry,
      sentryRequestHandler,
    },
  });
};

export default createErrorHandlerModule;
export type { ErrorHandlerModule };
