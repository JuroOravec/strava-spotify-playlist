import { ServerModuleName } from '../../types';
import type { ServerModules } from '../../lib/ServerModule';
import type { SpotifyModule } from '../spotify';

export interface OAuthStravaDeps extends ServerModules {
  [ServerModuleName.SPOTIFY]: SpotifyModule;
}
