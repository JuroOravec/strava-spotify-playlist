import type { Router } from 'express';

import {
  AnyServerModule,
  ModuleContext,
  ServerModules,
} from '../../lib/ServerModule';

export type RouterWithOptions = { router: Router; pathPrefix?: string };

export type RouterInput =
  | AnyServerModule
  | RouterWithOptions
  | (Router | AnyServerModule | RouterWithOptions)[];

export type RoutersFn<TModules extends ServerModules = ServerModules> = (
  ctx: ModuleContext<TModules>
) => RouterInput | Router;
