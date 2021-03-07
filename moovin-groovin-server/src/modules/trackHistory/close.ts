import type {
  ServerModule,
  Handlers,
  Services,
  Closer,
} from '../../lib/ServerModule';
import type { TrackHistoryData } from './data';

const createTrackHistoryCloser = (): Closer => {
  const close: Closer = function close(
    this: ServerModule<Services, Handlers, TrackHistoryData>
  ): void {
    this.data.watcherTimer?.stop();
  };

  return close;
};

export default createTrackHistoryCloser;
