import Spotify from 'spotify-web-api-node';

import type {
  ServerModule,
  Installer,
  Handlers,
  Services,
} from '../../lib/ServerModule';
import type { SpotifyData } from './data';

const createSpotifyInstaller = (): Installer => {
  const install: Installer = function install(
    this: ServerModule<Services, Handlers, SpotifyData>
  ): void {
    this.data.spotify = new Spotify({
      clientId: this.data.clientId,
      clientSecret: this.data.clientSecret,
    });
  };

  return install;
};

export { createSpotifyInstaller as default };
