import type { ServerModule, Closer } from '../../lib/ServerModule';
import type { StravaPushSub } from './types';
import type { StravaWebhookServices } from './services';

const createStravaWebhookCloser = (): Closer => {
  async function close(
    this: ServerModule<
      StravaWebhookServices,
      any,
      { sub: StravaPushSub | null }
    >
  ): Promise<void> {
    if (this.data.sub) await this.services.unsubscribeWebhook(this.data.sub.id);
  }

  return close;
};

export default createStravaWebhookCloser;
