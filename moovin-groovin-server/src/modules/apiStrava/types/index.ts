import type { Strava } from 'strava-v3';

import type AppServerModules from '../../../types/AppServerModules';
import type { ServerModuleName } from '../../../types';

export * from './models';

export type StravaClient = Omit<
  Strava,
  'pushSubscriptions' | 'oauth' | 'client' | 'config'
>;

export type ApiStravaDeps = Pick<
  AppServerModules,
  ServerModuleName.OAUTH_STRAVA
>;
