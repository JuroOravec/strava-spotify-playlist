// @ts-nocheck
// TODO REMOVE NOCHECK

import type AppServerModules from '../../types/AppServerModules';
import type { ServerModuleName } from '../../types';

export type PlaylistAppleDeps = Pick<
  AppServerModules,
  ServerModuleName.API_APPLE_MUSIC
>;
