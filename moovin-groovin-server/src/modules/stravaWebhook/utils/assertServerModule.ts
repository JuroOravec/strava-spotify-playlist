import type { ModuleContext, ServerModule } from '../../../lib/ServerModule';

function assertServerModule(
  context: ModuleContext<Record<string, ServerModule>>,
  module: string
): asserts context {
  if (!context || !context.modules[module]) {
    throw Error('Cannot access stravaAuth module');
  }
}

export default assertServerModule;
