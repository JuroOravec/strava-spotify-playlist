import type { StravaPushSub } from './types';

interface StravaWebhookExternalOptions {
  /** Whether the module should try to create a push subscription to Strava events */
  subscription: boolean;
  /**
   * Whether a new subscription should be created if `subscription` is `true`.
   *
   * If falsy, the module will use an existing subscription if one already exists.
   */
  overrideSubscription: boolean;
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
