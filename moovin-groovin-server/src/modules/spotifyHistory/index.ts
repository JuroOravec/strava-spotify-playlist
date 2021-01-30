import ServerModule, { Handlers } from '../../lib/ServerModule';
import { ServerModuleName } from '../../types';
import createInstaller from './install';
import createCloser from './close';
import createServices, { SpotifyHistoryServices } from './services';
import type { SpotifyHistoryData, SpotifyHistoryExternalData } from './data';
import type { SpotifyHistoryDeps } from './types';

type SpotifyHistoryModuleOptions = Partial<SpotifyHistoryExternalData>;
type SpotifyHistoryModule = ServerModule<
  SpotifyHistoryServices,
  Handlers,
  SpotifyHistoryData,
  SpotifyHistoryDeps
>;

const createSpotifyHistoryModule = (
  options: SpotifyHistoryModuleOptions = {}
): SpotifyHistoryModule => {
  const {
    delayPerUser = 200,
    tickPeriod = 10 * 60 * 1000,
    tickOffset = 3 * 1000,
  } = options;

  return new ServerModule({
    name: ServerModuleName.SPOTIFY_HISTORY,
    install: createInstaller(),
    close: createCloser(),
    services: createServices(),
    data: {
      ...options,
      watchedTokens: [],
      watcherTimer: null,
      delayPerUser,
      tickPeriod,
      tickOffset,
    },
  });
};

export default createSpotifyHistoryModule;
export type { SpotifyHistoryModule, SpotifyHistoryModuleOptions };
