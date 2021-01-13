import { Router } from 'express';

import type { RoutersFn } from '../types';
import mergeRouters from './mergeRouters';
import getModuleRouter from './getModuleRouter';

const defaultRouterMerger: RoutersFn = ({ modules }) => {
  const routers = Object.values(modules)
    .map((mod) => getModuleRouter(mod))
    .filter(Boolean) as Router[];
  return mergeRouters(routers);
};

export default defaultRouterMerger;
