import type { ServerModule, Installer } from '../../lib/ServerModule';
import type { PlaylistData } from './data';
import HandlebarsTemplateFormatter from './lib/TemplateFormatter';

const createPlaylistInstaller = (): Installer => {
  const install: Installer = async function install(
    this: ServerModule<any, any, PlaylistData>
  ) {
    this.data.templateFormater = new HandlebarsTemplateFormatter();
    await this.data.templateFormater.install();
  };

  return install;
};

export default createPlaylistInstaller;
