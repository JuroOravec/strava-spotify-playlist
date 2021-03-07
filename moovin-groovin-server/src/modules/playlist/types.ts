import type AppServerModules from '../../types/AppServerModules';
import type { ServerModuleName } from '../../types';
import type { DetailedActivity } from '../apiStrava/types';
import { UserActivityPlaylistMeta } from '../storePlaylist/types';

export type PlaylistDeps = Pick<
  AppServerModules,
  | ServerModuleName.API_STRAVA
  | ServerModuleName.STORE_CONFIG
  | ServerModuleName.STORE_TOKEN
  | ServerModuleName.STORE_USER
  | ServerModuleName.STORE_PLAYLIST
  | ServerModuleName.PLAYLIST_SPOTIFY
  | ServerModuleName.TRACK_HISTORY
>;

export interface ActivityInput {
  activityProviderId: string;
  activityId: string;
  /** Unix timestamp (seconds since epoch) when activity started. */
  startTime: number;
  /** Unix timestamp (seconds since epoch) when activity ended. */
  endTime: number;
  title: string;
  description: string;
  activityType: DetailedActivity['type'];
  descriptionLimit?: number;
}

export interface EnrichedTrack {
  providerId: string;
  trackId: string;
  title: string;
  album: string;
  artist: string;
  duration: number;
  startTime: number;
}

export interface PlaylistResponse {
  playlistId: string;
  title: string;
  url: string;
}

export interface EnrichedPlaylist
  extends UserActivityPlaylistMeta,
    Omit<Partial<PlaylistResponse>, 'playlistId'> {
  tracks: EnrichedTrack[];
}

export interface TemplateContextTrack {
  trackId: string;
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
