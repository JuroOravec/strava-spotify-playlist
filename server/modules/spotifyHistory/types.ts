import type { ServerModules } from '../../lib/ServerModule';
import type { ServerModuleName } from '../../types';
import type { StoreTokenModule } from '../storeToken';
import type { SpotifyModule } from '../spotify';
import type { UserTokenModel } from '../storeToken/types';
import type { StoreTrackModule } from '../storeTrack';

export interface SpotifyHistoryDeps extends ServerModules {
  [ServerModuleName.STORE_TOKEN]: StoreTokenModule;
  [ServerModuleName.STORE_TRACK]: StoreTrackModule;
  [ServerModuleName.SPOTIFY]: SpotifyModule;
}

export interface WatchedToken {
  token: UserTokenModel;
  lastTrackTimestamp: number | null;
}
