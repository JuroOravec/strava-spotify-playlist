import type AppServerModules from '../../types/AppServerModules';
import type { ServerModuleName } from '../../types';

export type ApiAppleMusicDeps = Pick<
  AppServerModules,
  | ServerModuleName.STORE_TOKEN
  | ServerModuleName.STORE_TRACK
  | ServerModuleName.OAUTH_APPLE_MUSIC
>;

export interface AppleMusicApiOptions {
  developerToken: string;
  musicUserToken?: string;
}
