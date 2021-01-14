import passport from 'passport';

import logger from '../../lib/logger';
import type {
  ServerModule,
  Closer,
  Services,
  Handlers,
} from '../../lib/ServerModule';
import type { OAuthData } from './data';

const createOAuthCloser = (): Closer => {
  const close: Closer = async function close(
    this: ServerModule<Services, Handlers, OAuthData>
  ) {
    this.data.cache?.close();

    if (!this.data.resolvedProviders) return;

    const providerNames = this.data.resolvedProviders.map(
      ({ providerId }) => providerId
    );

    logger.info(`Releasing OAuth providers: "${providerNames.join('", "')}"`);

    this.data.resolvedProviders.forEach(({ providerId }) =>
      passport.unuse(providerId)
    );
    logger.info(
      `Done releasing OAuth providers: "${providerNames.join('", "')}"`
    );
  };

  return close;
};

export { createOAuthCloser as default };
