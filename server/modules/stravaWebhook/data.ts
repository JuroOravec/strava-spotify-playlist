import type { StravaPushSub } from './types';

interface StravaWebhookExternalOptions {
  webhookCallbackUrl: string;
  verifyToken: string;
  /** How many activities should be in a single request when fetching many activies */
  activitiesPerPage: number;
}

type StravaWebhookInternalData = {
  sub: StravaPushSub | null;
};

type StravaWebhookData = StravaWebhookInternalData &
  StravaWebhookExternalOptions;

export { StravaWebhookData, StravaWebhookExternalOptions };
