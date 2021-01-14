import { Router } from 'express';

import type {
  ServerModule,
  Installer,
  ModuleContext,
} from '../../lib/ServerModule';
import type { RouterData } from './data';
import resolveRouters from './utils/resolveRouters';
import isRouter from './utils/isRouter';

const createRouterInstaller = (): Installer => {
  const install: Installer = function install(
    this: ServerModule<any, any, RouterData>,
    ctx: ModuleContext
  ): void {
    const { app } = ctx;

    const routersInput =
      typeof this.data.routers === 'function' && !isRouter(this.data.routers)
        ? // Allow user decide how the modules should be joined
          this.data.routers(ctx)
        : this.data.routers;

    const mergedRouter = resolveRouters(routersInput) || Router();

    app.use(this.data.rootPath, mergedRouter);
  };

  return install;
};

export { createRouterInstaller as default };
