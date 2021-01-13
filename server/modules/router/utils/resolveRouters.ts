import type { Router } from 'express';

import ServerModule, { AnyServerModule } from '../../../lib/ServerModule';
import type { RouterWithOptions, RouterInput } from '../types';
import mergeRouters from './mergeRouters';

const getModuleRouter = (mod: AnyServerModule): Router | void => mod.router?.();

const resolveRouters = (
  routerValue: RouterInput | Router
): Router | undefined => {
  const routerValues = Array.isArray(routerValue) ? routerValue : [routerValue];
  const resolvedRouter = mergeRouters(
    routerValues
      .map((routerOrModule) =>
        routerOrModule instanceof ServerModule
          ? getModuleRouter(routerOrModule)
          : routerOrModule
      )
      .filter(Boolean) as (RouterWithOptions | Router)[]
  );
  return resolvedRouter;
};

export default resolveRouters;
