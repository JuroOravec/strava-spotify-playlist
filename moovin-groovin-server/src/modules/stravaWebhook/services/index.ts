import type { Services } from '../../../lib/ServerModule';
import createSubscriptionServices, {
  StravaWebhookSubscriptionServices,
} from './subscription';
import createAthleteServices, { StravaWebhookAthleteServices } from './athlete';

type StravaWebhookServices = Services &
  StravaWebhookSubscriptionServices &
  StravaWebhookAthleteServices;

const createStravaWebhookServices = (): StravaWebhookServices => ({
  ...createSubscriptionServices(),
  ...createAthleteServices(),
});

export { createStravaWebhookServices as default, StravaWebhookServices };
