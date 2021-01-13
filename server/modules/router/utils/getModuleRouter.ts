import type { Router } from 'express';

import type { AnyServerModule } from '../../../lib/ServerModule';

const getModuleRouter = (mod: AnyServerModule): Router | void => mod.router?.();

export default getModuleRouter;
