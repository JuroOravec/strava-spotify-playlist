import { Handler, Router } from 'express';

import type {
  RouterCreator,
  ServerModule,
  Services,
} from '../../lib/ServerModule';
import type { StravaWebhookHandlers } from './handlers';

const defaultHandler: Handler = (_, res) =>
  res.status(500).json({ error: 'Endpoint not implemented' });

const createStravaWebhookRouter = (): RouterCreator => {
  const router: RouterCreator = function router(
    this: ServerModule<Services, StravaWebhookHandlers>,
    routerOptions
  ) {
    const router = Router(routerOptions)
      .get('/callback', this.handlers.webhookConfirm ?? defaultHandler)
      .post('/callback', this.handlers.webhookCallback ?? defaultHandler);

    return router;
  };
  return router;
};

export default createStravaWebhookRouter;
