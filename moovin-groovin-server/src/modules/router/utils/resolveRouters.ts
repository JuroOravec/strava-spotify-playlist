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
  mod: AnyServerModule,
  routerOptions?: RouterWithOptions['routerOptions']
): OptionalArray<RouterInputBase> | null => mod.router?.(routerOptions) || null;

const normalizeRouter = (router: RouterInputBase): RouterWithOptions =>
  isRouter(router) ? { router } : router;

const mergeRouters = (routers: RouterInputBase[]): Router => {
  const mergedRouter = routers.reduce((aggRouter, currRouter) => {
    const { router, pathPrefix = '/' } = normalizeRouter(currRouter);
    return normalizeRouter(aggRouter).router.use(pathPrefix, router);
  }, Router({ mergeParams: true })) as Router;

  return mergedRouter;
};

const isRouterOptions = (val: any): val is RouterWithOptions<any> =>
  Boolean(val.router && !(val instanceof ServerModule));

const resolveRouters = (...routerValues: RouterInput[]): Router | undefined => {
  const normRouterValues = ([] as unknown[])
    .concat(...routerValues)
    .filter(Boolean) as RouterInputSimple[];

  const routers = normRouterValues.reduce<RouterInputBase[]>(
    (aggRouters, routerOrModule) => {
      if (isNil(routerOrModule)) return aggRouters;

      // Get router, which can be either value itself or "router" field
      const routerOptions = isRouterOptions(routerOrModule)
        ? routerOrModule
        : null;
      const router = routerOptions ? routerOptions.router : routerOrModule;

      // No further action required, add what we've received
      if (!(router instanceof ServerModule)) {
        return aggRouters.concat(
          (routerOptions as RouterWithOptions) ?? router
        );
      }

      const moduleRouters = ([] as RouterInputBase[])
        .concat(getModuleRouter(router, routerOptions?.routerOptions) || [])
        .filter(Boolean);

      const moduleRoutersWithOptions = routerOptions
        ? moduleRouters.map(
            (currRouter): RouterWithOptions => ({
              ...routerOptions,
              ...(isRouterOptions(currRouter)
                ? currRouter
                : { router: currRouter }),
            })
          )
        : moduleRouters;

      return aggRouters.concat(moduleRoutersWithOptions);
    },
    []
  );
  const resolvedRouter = mergeRouters(routers);
  return resolvedRouter;
};

export { resolveRouters as default, mergeRouters, getModuleRouter };
