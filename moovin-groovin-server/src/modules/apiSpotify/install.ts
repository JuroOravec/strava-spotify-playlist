import Spotify from 'spotify-web-api-node';

import type {
  ServerModule,
  Installer,
  Handlers,
  Services,
} from '../../lib/ServerModule';
import type { ApiSpotifyData } from './data';

const createApiSpotifyInstaller = (): Installer => {
  const install: Installer = function install(
    this: ServerModule<Services, Handlers, ApiSpotifyData>
  ): void {
    this.data.spotify = new Spotify({
      clientId: this.data.clientId,
      clientSecret: this.data.clientSecret,
    });
  };

  return install;
};

export default createApiSpotifyInstaller;
