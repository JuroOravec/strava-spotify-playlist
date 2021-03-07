import ServerModule, { Handlers } from '../../lib/ServerModule';
import { ServerModuleName } from '../../types';
import createInstaller from './install';
import createCloser from './close';
import createServices, { TrackHistoryServices } from './services';
import type { TrackHistoryData, TrackHistoryExternalData } from './data';
import type { TrackHistoryDeps } from './types';

type TrackHistoryModuleOptions = Partial<TrackHistoryExternalData>;
type TrackHistoryModule = ServerModule<
  TrackHistoryServices,
  Handlers,
  TrackHistoryData,
  TrackHistoryDeps
>;

const createTrackHistoryModule = (
  options: TrackHistoryModuleOptions = {}
): TrackHistoryModule => {
  const {
    delayPerUpdate = 200,
    tickPeriod = 10 * 60 * 1000,
    tickOffset = 3 * 1000,
  } = options;

  return new ServerModule({
    name: ServerModuleName.TRACK_HISTORY,
    install: createInstaller(),
    close: createCloser(),
    services: createServices(),
    data: {
      ...options,
      watchedTokens: [],
      watcherTimer: null,
      delayPerUpdate,
      tickPeriod,
      tickOffset,
    },
  });
};

export default createTrackHistoryModule;
export type { TrackHistoryModule, TrackHistoryModuleOptions };
