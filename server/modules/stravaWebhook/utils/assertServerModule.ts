import { ModuleContext } from '../../../lib/ServerModule';

function assertServerModule(
  context: ModuleContext,
  module: string
): asserts context {
  if (!context || !context.modules[module]) {
    throw Error('Cannot access stravaAuth module');
  }
}

export default assertServerModule;
