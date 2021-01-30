import { Router } from 'express';

import type {
  ServerModule,
  RouterCreator,
  Services,
} from '../../lib/ServerModule';
import type { SessionData } from './data';
import type { SessionHandlers } from './handlers';

const createRouter = (): RouterCreator => {
  const router: RouterCreator = function router(
    this: ServerModule<Services, SessionHandlers, SessionData>,
    routerOptions
  ) {
    const router = Router(routerOptions).get(`/logout`, this.handlers.logout);

    return router;
  };

  return router;
};

export default createRouter;
