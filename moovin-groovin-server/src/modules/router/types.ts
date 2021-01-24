import type { Router } from 'express';

import type { OptionalArray } from '../../types';
import type {
  AnyServerModule,
  ModuleContext,
  ServerModules,
} from '../../lib/ServerModule';

export type RouterWithOptions = { router: Router; pathPrefix?: string };

export type RouterInputBase = Router | RouterWithOptions;
export type RouterInputSimple = RouterInputBase | AnyServerModule;
export type RouterInput = OptionalArray<RouterInputSimple>;
export type RouterInputFn<TModules extends ServerModules = ServerModules> = (
  ctx: ModuleContext<TModules>
) => RouterInput | Router;
