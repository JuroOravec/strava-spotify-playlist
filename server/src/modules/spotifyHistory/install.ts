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
    const { getTokensByProvider } = this.context.modules.storeToken.services;

    const tokens = (await getTokensByProvider('spotify')) || [];
    this.services.watchTrackHistory(tokens.map((token) => ({ token })));

    this.context.modules.storeToken.on('storeToken:didCreateToken', (token) =>
      this.services.watchTrackHistory([{ token }])
    );

    this.context.modules.storeToken.on('storeToken:didDeleteToken', (token) =>
      this.services.unwatchTrackHistory([token])
    );

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

export { createSpotifyHistoryInstaller as default };
