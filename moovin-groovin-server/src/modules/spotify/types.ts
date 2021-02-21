import type Spotify from 'spotify-web-api-node';

import type AppServerModules from '../../types/AppServerModules';
import type { ServerModuleName } from '../../types';

export type SpotifyOptions = NonNullable<
  ConstructorParameters<typeof Spotify>[0]
>;

export type SpotifyDeps = Pick<
  AppServerModules,
  | ServerModuleName.STORE_TOKEN
  | ServerModuleName.STORE_TRACK
  | ServerModuleName.OAUTH_SPOTIFY
>;

export type SpotifyTrack = SpotifyApi.UsersRecentlyPlayedTracksResponse['items'][0];

export type RecentlyPlayedTracksOptions = NonNullable<
  Parameters<Spotify['getMyRecentlyPlayedTracks']>[0]
>;
