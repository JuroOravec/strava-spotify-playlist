import isNil from 'lodash/isNil';

import type { ServerModule, Installer } from '../../lib/ServerModule';
import PlaylistProviderApi from './lib/PlaylistProviderApi';
import HandlebarsTemplateFormatter from './lib/TemplateFormatter';
import type { PlaylistData } from './data';

const createPlaylistInstaller = (): Installer => {
  const install: Installer = async function install(
    this: ServerModule<any, any, PlaylistData>,
    context
  ) {
    const playlistProviders =
      typeof this.data.playlistProviders === 'function'
        ? // Allow user to access providers from other modules
          this.data.playlistProviders(context)
        : this.data.playlistProviders;

    const resolvedModules = Array.isArray(playlistProviders)
      ? playlistProviders
      : !isNil(playlistProviders)
      ? [playlistProviders]
      : [];
    this.data.playlistProviderApi = new PlaylistProviderApi(resolvedModules);

    this.data.templateFormater = new HandlebarsTemplateFormatter();
    await this.data.templateFormater.install();
  };

  return install;
};

export default createPlaylistInstaller;
