import type { ServerModuleName } from '../../types';
import type AppServerModules from '../../types/AppServerModules';

export type TrackHistoryDeps = Pick<
  AppServerModules,
  | ServerModuleName.STORE_TOKEN
  | ServerModuleName.STORE_TRACK
  | ServerModuleName.PLAYLIST_SPOTIFY
>;
