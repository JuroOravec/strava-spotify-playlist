import { Strava } from 'strava-v3';

import type { ServerModules } from '../../../lib/ServerModule';
import type { ServerModuleName } from '../../../types';
import type { OAuthStravaModule } from '../../oauthStrava';

export * from './models';

export type StravaClient = Omit<
  Strava,
  'pushSubscriptions' | 'oauth' | 'client' | 'config'
>;

export interface StravaDeps extends ServerModules {
  [ServerModuleName.OAUTH_STRAVA]: OAuthStravaModule;
}
