import type { ServerModule, Installer } from '../../lib/ServerModule';
import type { StravaSpotifyData } from './data';
import HandlebarsTemplateFormatter from './lib/TemplateFormatter';

const createStravaSpotifyInstaller = (): Installer => {
  const install: Installer = async function install(
    this: ServerModule<any, any, StravaSpotifyData>
  ) {
    this.data.templateFormater = new HandlebarsTemplateFormatter();
    await this.data.templateFormater.install();
  };

  return install;
};

export default createStravaSpotifyInstaller;
