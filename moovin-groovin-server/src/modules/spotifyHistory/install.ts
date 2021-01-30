import {
  ServerModule,
  Installer,
  Handlers,
  assertContext,
} from '../../lib/ServerModule';
import logger from '../../lib/logger';
import Ticker from './lib/Ticker';
import type { SpotifyHistoryDeps } from './types';
import type { SpotifyHistoryData } from './data';
import type { SpotifyHistoryServices } from './services';

const createSpotifyHistoryInstaller = (): Installer => {
  const install: Installer = async function install(
    this: ServerModule<
      SpotifyHistoryServices,
      Handlers,
      SpotifyHistoryData,
      SpotifyHistoryDeps
    >
  ): Promise<void> {
    assertContext(this.context);

    this.data.watcherTimer = new Ticker({
      tickEvent: 'tick',
      tickPeriod: this.data.tickPeriod,
      tickOffset: this.data.tickOffset,
    });
    this.data.watcherTimer.on('tick', async () => {
      logger.debug('Running spotifyHistory tick callback');
      await this.services.onTrackHistoryTick();
      logger.debug('Done running spotifyHistory tick callback');
    });
    this.data.watcherTimer.start();
  };

  return install;
};

export default createSpotifyHistoryInstaller;
