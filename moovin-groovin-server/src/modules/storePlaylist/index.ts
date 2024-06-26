import ServerModule, { Handlers } from '../../lib/ServerModule';
import { ServerModuleName } from '../../types';
import createCloser from './close';
import createInstaller from './install';
import createServices, { StorePlaylistServices } from './services';
import createGraphql from './graphql';
import type { StorePlaylistData, StorePlaylistExternalData } from './data';

type StorePlaylistModuleOptions = Partial<StorePlaylistExternalData>;

type StorePlaylistModule = ServerModule<
  StorePlaylistServices,
  Handlers,
  StorePlaylistData
>;

const createStorePlaylistModule = (
  options: StorePlaylistModuleOptions
): StorePlaylistModule => {
  const { clientConfig = {} } = options;

  return new ServerModule({
    name: ServerModuleName.STORE_PLAYLIST,
    install: createInstaller(),
    close: createCloser(),
    services: createServices(),
    graphql: createGraphql(),
    data: {
      ...options,
      clientConfig,
      playlistStore: null,
    },
  });
};

export default createStorePlaylistModule;
export type { StorePlaylistModule, StorePlaylistModuleOptions };
