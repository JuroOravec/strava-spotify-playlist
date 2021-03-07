import type { ServerModuleName } from '../../../types';
import type AppServerModules from '../../../types/AppServerModules';

export * as webhookEvents from './webhookEvents';

export interface StravaPushSub {
  id: number;
  resource_state: number;
  application_id: number;
  callback_url: string;
  created_at: string;
  updated_at: string;
}

export type StravaWebhookDeps = Pick<
  AppServerModules,
  | ServerModuleName.API_STRAVA
  | ServerModuleName.HOST
  | ServerModuleName.OAUTH_STRAVA
  | ServerModuleName.STORE_TOKEN
  | ServerModuleName.PLAYLIST
>;
