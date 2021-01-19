import passport from 'passport';
import NodeCache from 'node-cache';

import logger from '../../lib/logger';
import {
  ServerModule,
  ModuleContext,
  Installer,
  Services,
  Handlers,
  assertContext,
} from '../../lib/ServerModule';
import type { OAuthData } from './data';
import type { OAuthInput } from './types';
import { resolveProviderCallbackUrl } from './utils/providerUrl';

const createOAuthInstaller = (): Installer => {
  const install: Installer = async function install(
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

    assertContext(this.context);
    const { resolveUrl } = this.context?.modules.host.services;
    const callbackUrlRoot = await resolveUrl(this.data.callbackUrlRoot);

    this.data.resolvedProviders.forEach(({ providerId, oauth }) => {
      const callbackUrl = resolveProviderCallbackUrl(
        callbackUrlRoot,
        providerId
      );

      const strategy = oauth({ callbackUrl });
      if (!strategy) return;

      passport.use(providerId, strategy);
    });

    if (this.data.initializePassport) {
      app.use(passport.initialize());
    }
    logger.info(
      `Done creating OAuth providers: "${providerNames.join('", "')}"`
    );
  };

  return install;
};

export { createOAuthInstaller as default };
