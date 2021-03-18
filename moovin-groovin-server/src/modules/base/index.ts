import path from 'path';

import ServerModule, { Services, Handlers } from '../../lib/ServerModule';
import { ServerModuleName } from '../../types';
import type { BaseData } from './data';
import createInstaller from './install';

type BaseModuleOptions = Partial<BaseData>;
type BaseModule = ServerModule<Services, Handlers, BaseData>;

const createBaseModule = (options: BaseModuleOptions = {}): BaseModule => {
  const {
    root = path.normalize(__dirname + '/../..'),
    viewDirs = [],
  } = options;
  return new ServerModule({
    name: ServerModuleName.BASE,
    install: createInstaller(),
    data: {
      ...options,
      root,
      viewDirs,
    },
  });
};

export default createBaseModule;
export type { BaseModule, BaseModuleOptions };
