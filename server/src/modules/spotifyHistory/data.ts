import Ticker from './lib/Ticker';

type SpotifyHistoryExternalData = {
  /**
   * How much in milliseconds to wait between users when fetching recently played tracks.
   *
   * Increase to avoid rate limiting.
   */
  delayPerUser: number;
  /** How often in milliseconds to fetch recently played tracks from Spotify. */
  tickPeriod: number;
  /**
   * How much in milliseconds to wait after install before the first request
   * to get recently played tracks.
   */
  tickOffset: number;
};

interface SpotifyHistoryInternalData {
  watcherTimer: Ticker | null;
}

type SpotifyHistoryData = SpotifyHistoryExternalData &
  SpotifyHistoryInternalData;

export { SpotifyHistoryData, SpotifyHistoryExternalData };
