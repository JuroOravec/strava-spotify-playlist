import type { ServerModuleName } from '../../types';
import type AppServerModules from '../../types/AppServerModules';

export type OAuthSpotifyDeps = Pick<
  AppServerModules,
  ServerModuleName.API_SPOTIFY
>;
