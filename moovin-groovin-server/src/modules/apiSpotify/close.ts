import type {
  ServerModule,
  Handlers,
  Services,
  Closer,
} from '../../lib/ServerModule';
import type { ApiSpotifyData } from './data';

const createApiSpotifyCloser = (): Closer => {
  const close: Closer = function close(
    this: ServerModule<Services, Handlers, ApiSpotifyData>
  ): void {
    this.data.spotify?.resetCredentials();
  };

  return close;
};

export default createApiSpotifyCloser;
