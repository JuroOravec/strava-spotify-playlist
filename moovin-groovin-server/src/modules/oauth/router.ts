import { Router } from 'express';

import type {
  ServerModule,
  RouterCreator,
  Services,
} from '../../lib/ServerModule';
import type { OAuthData } from './data';
import type { OAuthHandlers } from './handlers';

const createRouter = (): RouterCreator => {
  const router: RouterCreator = function router(
    this: ServerModule<Services, OAuthHandlers, OAuthData>,
    routerOptions
  ) {
    const router = Router(routerOptions);

    if (!this.data.resolvedProviders) return router;

    const providers = this.data.resolvedProviders || [];

    providers.forEach(({ providerId, callbackHandler, loginHandler }) => {
      router
        .get(`/${providerId}/login`, loginHandler)
        .get(`/${providerId}/callback`, loginHandler, callbackHandler);
    });

    return router;
  };

  return router;
};

export { createRouter as default };
