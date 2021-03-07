import type AppServerModules from '../../types/AppServerModules';
import type { ServerModuleName } from '../../types';

export type PlaylistSpotifyDeps = Pick<
  AppServerModules,
  ServerModuleName.API_SPOTIFY
>;
