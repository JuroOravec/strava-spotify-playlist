import { Router } from 'express';
import isNil from 'lodash/isNil';

import type { OptionalArray } from '../../../types';
import ServerModule, { AnyServerModule } from '../../../lib/ServerModule';
import type {
  RouterWithOptions,
  RouterInput,
  RouterInputBase,
  RouterInputSimple,
} from '../types';
import isRouter from './isRouter';

const getModuleRouter = (
  mod: AnyServerModule
): OptionalArray<RouterInputBase> | null => mod.router?.() || null;

const normalizeRouter = (router: RouterInputBase): RouterWithOptions =>
  isRouter(router) ? { router } : router;

const mergeRouters = (routers: RouterInputBase[]): Router => {
  const mergedRouter = routers.reduce((aggRouter, currRouter) => {
    const { router, pathPrefix = '/' } = normalizeRouter(currRouter);
    return normalizeRouter(aggRouter).router.use(pathPrefix, router);
  }, Router({ mergeParams: true })) as Router;

  return mergedRouter;
};

const resolveRouters = (...routerValues: RouterInput[]): Router | undefined => {
  const normRouterValues = ([] as unknown[])
    .concat(...routerValues)
    .filter(Boolean) as RouterInputSimple[];

  const routers = normRouterValues.reduce<RouterInputBase[]>(
    (aggRouters, routerOrModule) => {
      if (!isNil(routerOrModule) && !(routerOrModule instanceof ServerModule)) {
        return aggRouters.concat(routerOrModule);
      }

      const moduleRouters = ([] as RouterInputBase[])
        .concat(getModuleRouter(routerOrModule) || [])
        .filter(Boolean);
      return aggRouters.concat(moduleRouters);
    },
    []
  );

  const resolvedRouter = mergeRouters(routers);
  return resolvedRouter;
};

export { resolveRouters as default, mergeRouters, getModuleRouter };
