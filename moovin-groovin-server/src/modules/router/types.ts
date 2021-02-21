import type { Router, RouterOptions } from 'express';

import type { OptionalArray } from '@moovin-groovin/shared';
import type {
  AnyServerModule,
  ModuleContext,
  AnyServerModules,
} from '../../lib/ServerModule';

export type RouterWithOptions<T extends Router | AnyServerModule = Router> = {
  router: T;
  routerOptions?: RouterOptions;
  pathPrefix?: string;
};

export type RouterInputBase = Router | RouterWithOptions;
export type RouterInputSimple =
  | RouterInputBase
  | AnyServerModule
  | RouterWithOptions<AnyServerModule>;
export type RouterInput = OptionalArray<RouterInputSimple>;
export type RouterInputFn<
  TModules extends AnyServerModules = AnyServerModules,
  TInput extends RouterInput = RouterInput
> = (ctx: ModuleContext<TModules>) => TInput;
