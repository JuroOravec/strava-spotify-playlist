import ServerModule, { Handlers, Services } from '../../lib/ServerModule';
import { ServerModuleName } from '../../types';
import defaultRouterMerger from './utils/defaultRouterMerger';
import createInstaller from './install';
import { RouterData, RouterExternalData } from './data';

type RouterModuleOptions = Partial<RouterExternalData>;
type RouterModule = ServerModule<Services, Handlers, RouterData>;

const createRouterModule = (
  options: RouterModuleOptions = {}
): RouterModule => {
  const { routers = defaultRouterMerger, rootPath = '/' } = options;
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
