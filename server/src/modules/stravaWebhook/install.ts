import {
  ModuleContext,
  Installer,
  ServerModule,
  Handlers,
  assertContext,
} from '../../lib/ServerModule';
import type { StravaWebhookServices } from './services';
import type { StravaWebhookData } from './data';
import type { StravaWebhookDeps } from './types';

const createStravaWebhookInstaller = (): Installer => {
  const install: Installer = async function install(
    this: ServerModule<
      StravaWebhookServices,
      Handlers,
      StravaWebhookData,
      StravaWebhookDeps
    >,
    { app }: ModuleContext
  ) {
    app.on('listen', async () => {
      assertContext(this.context);
      const { resolveUrl } = this.context.modules.host.services;
      if (this.data.subscription) {
        this.data.sub = await this.services.subscribeWebhook({
          callbackUrl: await resolveUrl(this.data.webhookCallbackUrl),
          verifyToken: this.data.verifyToken,
          override: this.data.overrideSubscription,
        });
      }
    });
  };

  return install;
};

export { createStravaWebhookInstaller as default };
