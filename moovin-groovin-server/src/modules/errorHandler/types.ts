import type { NodeOptions } from '@sentry/node';

import type { ModuleContext, AnyServerModules } from '../../lib/ServerModule';

export type SentryInput = NodeOptions;
export type SentryInputFn<
  TModules extends AnyServerModules = AnyServerModules,
  TInput extends SentryInput = SentryInput
> = (ctx: ModuleContext<TModules>) => TInput;
