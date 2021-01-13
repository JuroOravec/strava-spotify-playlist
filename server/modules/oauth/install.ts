import passport from 'passport';
import NodeCache from 'node-cache';

import logger from '../../lib/logger';
import type {
  ServerModule,
  ModuleContext,
  Installer,
  Services,
  Handlers,
} from '../../lib/ServerModule';
import type { OAuthData } from './data';
import type { OAuthInput } from './types';
import { resolveProviderCallbackUrl } from './utils/providerUrl';

const createOAuthInstaller = (): Installer => {
  const install: Installer = function install(
    this: ServerModule<Services, Handlers, OAuthData>,
    ctx: ModuleContext
  ) {
    const { app } = ctx;

    this.data.cache = new NodeCache({
      stdTTL: 600,
      deleteOnExpire: true,
      useClones: false,
      checkperiod: 60,
    });

    const providersInput: OAuthInput =
      typeof this.data.providers === 'function'
        ? // Allow user decide how the modules should be joined
          this.data.providers(ctx)
        : this.data.providers;

    this.data.resolvedProviders = Array.isArray(providersInput)
      ? providersInput
      : [providersInput];

    const providerNames = this.data.resolvedProviders.map(
      ({ providerId }) => providerId
    );
    logger.info(`Creating OAuth providers: "${providerNames.join('", "')}"`);

    this.data.resolvedProviders.forEach(({ providerId, oauth }) => {
      const callbackUrl = resolveProviderCallbackUrl(
        this.data.callbackUrlRoot,
        providerId
      );

      const strategy = oauth({ callbackUrl });
      if (!strategy) return;

      passport.use(providerId, strategy);
    });

    app.use(passport.initialize());
    logger.info(
      `Done creating OAuth providers: "${providerNames.join('", "')}"`
    );
  };

  return install;
};

export { createOAuthInstaller as default };
