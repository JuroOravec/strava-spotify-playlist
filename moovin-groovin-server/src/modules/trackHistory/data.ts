import Ticker from './lib/Ticker';

type TrackHistoryExternalData = {
  /**
   * How much in milliseconds to wait between users/stream service when fetching recently played tracks.
   *
   * Increase to avoid rate limiting.
   */
  delayPerUpdate: number;
  /** How often in milliseconds to fetch recently played tracks from playlist providers. */
  tickPeriod: number;
  /**
   * How much in milliseconds to wait after install before the first request
   * to get recently played tracks.
   */
  tickOffset: number;
};

interface TrackHistoryInternalData {
  watcherTimer: Ticker | null;
}

type TrackHistoryData = TrackHistoryExternalData & TrackHistoryInternalData;

export { TrackHistoryData, TrackHistoryExternalData };
