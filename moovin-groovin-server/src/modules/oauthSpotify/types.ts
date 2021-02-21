import type { ServerModuleName } from '../../types';
import type AppServerModules from '../../types/AppServerModules';

export type OAuthStravaDeps = Pick<AppServerModules, ServerModuleName.SPOTIFY>;
