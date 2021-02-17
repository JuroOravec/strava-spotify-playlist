import type { NodeOptions } from '@sentry/node';

import type { ModuleContext, ServerModules } from '../../lib/ServerModule';

export type SentryInput = NodeOptions;
export type SentryInputFn<
  TModules extends ServerModules = ServerModules,
  TInput extends SentryInput = SentryInput
> = (ctx: ModuleContext<TModules>) => TInput;
