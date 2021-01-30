import type {
  ServerModule,
  Handlers,
  Services,
  Closer,
} from '../../lib/ServerModule';
import type { SpotifyData } from './data';

const createSpotifyCloser = (): Closer => {
  const close: Closer = function close(
    this: ServerModule<Services, Handlers, SpotifyData>
  ): void {
    this.data.spotify?.resetCredentials();
  };

  return close;
};

export default createSpotifyCloser;
