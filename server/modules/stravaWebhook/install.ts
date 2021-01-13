import type {
  ModuleContext,
  Installer,
  ServerModule,
  Handlers,
} from '../../lib/ServerModule';
import type { StravaWebhookServices } from './services';
import type { StravaWebhookData } from './data';

const createStravaWebhookInstaller = (): Installer => {
  const install: Installer = async function install(
    this: ServerModule<StravaWebhookServices, Handlers, StravaWebhookData>,
    { app }: ModuleContext
  ) {
    app.on('listen', async () => {
      this.data.sub = await this.services.subscribeWebhook({
        callbackUrl: this.data.webhookCallbackUrl,
        verifyToken: this.data.verifyToken,
      });
    });
  };

  return install;
};

export { createStravaWebhookInstaller as default };
