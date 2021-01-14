import type Spotify from 'spotify-web-api-node';

import type { ServerModules } from '../../lib/ServerModule';
import type { ServerModuleName } from '../../types';
import type { OAuthStravaModule } from '../oauthStrava';
import type { StoreTokenModule } from '../storeToken';
import type { StoreTrackModule } from '../storeTrack';

export type SpotifyOptions = NonNullable<
  ConstructorParameters<typeof Spotify>[0]
>;

export interface SpotifyDeps extends ServerModules {
  [ServerModuleName.STORE_TOKEN]: StoreTokenModule;
  [ServerModuleName.STORE_TRACK]: StoreTrackModule;
  [ServerModuleName.OAUTH_SPOTIFY]: OAuthStravaModule;
}

export type SpotifyTrack = SpotifyApi.UsersRecentlyPlayedTracksResponse['items'][0];

export type RecentlyPlayedTracksOptions = NonNullable<
  Parameters<Spotify['getMyRecentlyPlayedTracks']>[0]
>;
