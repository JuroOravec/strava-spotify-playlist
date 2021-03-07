import ServerModule, { Data, Handlers } from '../../lib/ServerModule';
import { ServerModuleName } from '../../types';
import createServices, { PlaylistSpotifyServices } from './services';
import type { PlaylistSpotifyDeps } from './types';

type PlaylistSpotifyModule = ServerModule<
  PlaylistSpotifyServices,
  Handlers,
  Data,
  PlaylistSpotifyDeps
>;

const createPlaylistSpotifyModule = (): PlaylistSpotifyModule =>
  new ServerModule({
    name: ServerModuleName.PLAYLIST_SPOTIFY,
    services: createServices(),
  });

export default createPlaylistSpotifyModule;
export type { PlaylistSpotifyModule };
