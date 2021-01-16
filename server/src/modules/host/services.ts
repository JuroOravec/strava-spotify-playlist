import isNil from 'lodash/isNil';

import ServerModule, { Handlers, Services } from '../../lib/ServerModule';
import type { HostData } from './data';

interface HostServices extends Services {
  getOrigin: () => Promise<string>;
  resolveUrl: (urlOrPath: string) => Promise<string>;
}

type ThisModule = ServerModule<HostServices, Handlers, HostData>;

const createSpotifyHistoryServices = (): HostServices => {
  async function getOrigin(this: ThisModule): Promise<string> {
    if (this.data.localtunnelEnabled && this.data.localtunnel) {
      return this.data.localtunnel.url;
    }

    if (this.data.origin) return this.data.origin;

    const localUrl = new URL('http://localhost');
    if (!isNil(this.data.port)) {
      localUrl.port = this.data.port.toString();
    }
    return localUrl.origin;
  }

  async function resolveUrl(
    this: ThisModule,
    urlOrPath: string
  ): Promise<string> {
    if (urlOrPath.startsWith('/')) {
      const origin = await this.services.getOrigin();
      return `${origin}${urlOrPath}`;
    }
    return urlOrPath;
  }

  return {
    getOrigin,
    resolveUrl,
  };
};

export { createSpotifyHistoryServices as default, HostServices };
