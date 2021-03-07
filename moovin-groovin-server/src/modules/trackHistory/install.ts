import {
  ServerModule,
  Installer,
  Handlers,
  assertContext,
} from '../../lib/ServerModule';
import logger from '../../lib/logger';
import Ticker from './lib/Ticker';
import type { TrackHistoryDeps } from './types';
import type { TrackHistoryData } from './data';
import type { TrackHistoryServices } from './services';

const createTrackHistoryInstaller = (): Installer => {
  const install: Installer = async function install(
    this: ServerModule<
      TrackHistoryServices,
      Handlers,
      TrackHistoryData,
      TrackHistoryDeps
    >
  ): Promise<void> {
    assertContext(this.context);

    this.data.watcherTimer = new Ticker({
      tickEvent: 'tick',
      tickPeriod: this.data.tickPeriod,
      tickOffset: this.data.tickOffset,
    });
    this.data.watcherTimer.on('tick', async () => {
      logger.debug('Running trackHistory tick callback');
      await this.services.onTrackHistoryTick();
      logger.debug('Done running trackHistory tick callback');
    });
    this.data.watcherTimer.start();
  };

  return install;
};

export default createTrackHistoryInstaller;
