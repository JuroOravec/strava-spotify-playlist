import type { AnyServerModules, ModuleContext } from '../../lib/ServerModule';
import type AppServerModules from '../../types/AppServerModules';
import type { ServerModuleName } from '../../types';
import type { DetailedActivity } from '../apiStrava/types';
import type { UserActivityPlaylistMeta } from '../storePlaylist/types';
import type { TrackModel } from '../storeTrack/types';
import type { OptionalArray } from '@moovin-groovin/shared';
import type { PlaylistProviderApiModule } from './lib/PlaylistProviderApi';

export type PlaylistDeps = Pick<
  AppServerModules,
  | ServerModuleName.API_STRAVA
  | ServerModuleName.STORE_CONFIG
  | ServerModuleName.STORE_TOKEN
  | ServerModuleName.STORE_TRACK
  | ServerModuleName.STORE_USER
  | ServerModuleName.STORE_PLAYLIST
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

export interface EnrichedTrack extends TrackModel {
  /** Unix timestamp (seconds since epoch) when track started. */
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

export type PlaylistProviderInput = OptionalArray<PlaylistProviderApiModule>;
export type PlaylistProviderInputFn<
  TModules extends AnyServerModules = AnyServerModules,
  TInput extends PlaylistProviderInput = PlaylistProviderInput
> = (ctx: ModuleContext<TModules>) => TInput;
