import type { ServerModules } from '../../../lib/ServerModule';
import type { ServerModuleName } from '../../../types';
import type { OAuthStravaModule } from '../../oauthStrava';
import type { StravaModule } from '../../strava';
import type { StoreTokenModule } from '../../storeToken';
import type { StravaSpotifyModule } from '../../stravaSpotify';

export * as webhookEvents from './webhookEvents';

export interface StravaPushSub {
  id: number;
  resource_state: number;
  application_id: number;
  callback_url: string;
  created_at: string;
  updated_at: string;
}

export interface StravaWebhookDeps extends ServerModules {
  [ServerModuleName.OAUTH_STRAVA]: OAuthStravaModule;
  [ServerModuleName.STRAVA]: StravaModule;
  [ServerModuleName.STORE_TOKEN]: StoreTokenModule;
  [ServerModuleName.STRAVA_SPOTIFY]: StravaSpotifyModule;
}
