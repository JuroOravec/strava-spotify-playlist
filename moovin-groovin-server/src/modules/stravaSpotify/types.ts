import type { ServerModules } from '../../lib/ServerModule';
import type { OptionalPromise, ServerModuleName } from '../../types';
import type { StravaModule } from '../strava';
import type { SpotifyModule } from '../spotify';
import type { SpotifyHistoryModule } from '../spotifyHistory';
import type { StoreConfigModule } from '../storeConfig';
import type { StorePlaylistModule } from '../storePlaylist';
import type { StoreUserModule } from '../storeUser';
import type { StoreTokenModule } from '../storeToken';
import type { UserTrackModel } from '../storeTrack/types';
import type { DetailedActivity } from '../strava/types';

export interface StravaSpotifyDeps extends ServerModules {
  [ServerModuleName.STORE_CONFIG]: StoreConfigModule;
  [ServerModuleName.STORE_TOKEN]: StoreTokenModule;
  [ServerModuleName.STORE_USER]: StoreUserModule;
  [ServerModuleName.STORE_PLAYLIST]: StorePlaylistModule;
  [ServerModuleName.STRAVA]: StravaModule;
  [ServerModuleName.SPOTIFY]: SpotifyModule;
  [ServerModuleName.SPOTIFY_HISTORY]: SpotifyHistoryModule;
}

export interface ActivityInput {
  activityId: string;
  /** Unix timestamp (seconds since epoch) when activity started. */
  startTime: number;
  /** Unix timestamp (seconds since epoch) when activity ended. */
  endTime: number;
  title: string;
  description: string;
  activityType: DetailedActivity['type'];
}

export type TrackWithMetadata = UserTrackModel & {
  metadata: SpotifyApi.TrackObjectFull | null;
};

export interface TemplateContextTrack {
  title: string;
  album: string;
  artist: string;
  duration: string;
  startTime: string;
}

export interface TemplateContextActivity {
  title: string;
  description: string;
  type: string;
  duration: string;
  date: string;
  url: string;
}

interface TemplateContextPlaylist {
  tracks: TemplateContextTrack[];
  tracklist: string;
}

export interface TemplateContextMeta {
  app: string;
}

export interface PlaylistTemplateContext {
  activity: TemplateContextActivity;
  playlist: TemplateContextPlaylist;
  meta: TemplateContextMeta;
}

interface ActivityTemplateContextPlaylist extends TemplateContextPlaylist {
  url: string;
  title: string;
}

export type ActivityTemplateContext = PlaylistTemplateContext & {
  playlist: ActivityTemplateContextPlaylist;
};

export interface TemplateFormatter {
  install: () => OptionalPromise<void>;
  close: () => OptionalPromise<void>;
  formatPlaylistTitle: (
    template: string,
    context: PlaylistTemplateContext
  ) => OptionalPromise<string>;
  formatPlaylistDescription: (
    template: string,
    context: PlaylistTemplateContext
  ) => OptionalPromise<string>;
  formatActivityDescription: (
    template: string,
    context: ActivityTemplateContext
  ) => OptionalPromise<string>;
}
