import type { OptionalPromise } from '@moovin-groovin/shared';
import type AppServerModules from '../../types/AppServerModules';
import type { ServerModuleName } from '../../types';
import type { UserTrackModel } from '../storeTrack/types';
import type { DetailedActivity } from '../strava/types';

export type StravaSpotifyDeps = Pick<
  AppServerModules,
  | ServerModuleName.STORE_CONFIG
  | ServerModuleName.STORE_TOKEN
  | ServerModuleName.STORE_USER
  | ServerModuleName.STORE_PLAYLIST
  | ServerModuleName.STRAVA
  | ServerModuleName.SPOTIFY
  | ServerModuleName.SPOTIFY_HISTORY
>;

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
