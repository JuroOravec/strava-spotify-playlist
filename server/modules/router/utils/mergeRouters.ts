import { Router } from 'express';

import type { RouterWithOptions } from '../types';
import isRouter from './isRouter';

const normalizeRouter = (
  router: RouterWithOptions | Router
): RouterWithOptions => (isRouter(router) ? { router } : router);

const mergeRouters = (routers: (Router | RouterWithOptions)[]): Router => {
  const mergedRouter = routers.reduce((aggRouter, currRouter) => {
    const { router, pathPrefix = '/' } = normalizeRouter(currRouter);
    return normalizeRouter(aggRouter).router.use(pathPrefix, router);
  }, Router({ mergeParams: true })) as Router;

  return mergedRouter;
};

export default mergeRouters;
