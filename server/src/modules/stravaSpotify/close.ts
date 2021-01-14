import type {
  ServerModule,
  Closer,
  Handlers,
  Services,
} from '../../lib/ServerModule';
import type { StravaSpotifyData } from './data';

const createStravaSpotifyCloser = (): Closer => {
  const close: Closer = async function close(
    this: ServerModule<Services, Handlers, StravaSpotifyData>
  ): Promise<void> {
    await this.data.templateFormater?.close();
    this.data.templateFormater = null;
  };

  return close;
};

export { createStravaSpotifyCloser as default };
