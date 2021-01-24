import ServerModule, { Handlers, Services } from '../../lib/ServerModule';
import { ServerModuleName } from '../../types';
import createInstaller from './install';
import type { RouterData, RouterExternalData } from './data';
import type { RouterInputFn } from './types';

type RouterModuleOptions = Partial<RouterExternalData>;
type RouterModule = ServerModule<Services, Handlers, RouterData>;

const defaultRouters: RouterInputFn<any> = ({ modules }) => modules;

const createRouterModule = (
  options: RouterModuleOptions = {}
): RouterModule => {
  const { routers = defaultRouters, rootPath = '/' } = options;
  return new ServerModule({
    name: ServerModuleName.ROUTER,
    install: createInstaller(),
    data: {
      ...options,
      routers,
      rootPath,
    },
  });
};
export { createRouterModule as default, RouterModule, RouterModuleOptions };
