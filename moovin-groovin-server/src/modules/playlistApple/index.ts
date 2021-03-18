import ServerModule, { Data, Handlers } from '../../lib/ServerModule';
import { ServerModuleName } from '../../types';
import createServices, { PlaylistAppleServices } from './services';
import type { PlaylistAppleDeps } from './types';

type PlaylistAppleModule = ServerModule<
  PlaylistAppleServices,
  Handlers,
  Data,
  PlaylistAppleDeps
>;

const createPlaylistAppleModule = (): PlaylistAppleModule =>
  new ServerModule({
    name: ServerModuleName.PLAYLIST_APPLE,
    services: createServices(),
  });

export default createPlaylistAppleModule;
export type { PlaylistAppleModule };
