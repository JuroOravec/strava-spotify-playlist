import type {
  ServerModule,
  Handlers,
  Services,
  Closer,
} from '../../lib/ServerModule';
import type { SpotifyHistoryData } from './data';

const createSpotifyHistoryCloser = (): Closer => {
  const close: Closer = function close(
    this: ServerModule<Services, Handlers, SpotifyHistoryData>
  ): void {
    this.data.watcherTimer?.stop();
  };

  return close;
};

export default createSpotifyHistoryCloser;
