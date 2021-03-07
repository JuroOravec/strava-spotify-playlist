import type {
  ServerModule,
  Closer,
  Handlers,
  Services,
} from '../../lib/ServerModule';
import type { PlaylistData } from './data';

const createPlaylistCloser = (): Closer => {
  const close: Closer = async function close(
    this: ServerModule<Services, Handlers, PlaylistData>
  ): Promise<void> {
    await this.data.templateFormater?.close();
    this.data.templateFormater = null;
  };

  return close;
};

export default createPlaylistCloser;
