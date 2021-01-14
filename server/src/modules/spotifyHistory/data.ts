import Ticker from './lib/Ticker';
import type { WatchedToken } from './types';

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
  /** Tokens of users whose tracks are caching */
  watchedTokens: WatchedToken[];
  watcherTimer: Ticker | null;
}

type SpotifyHistoryData = SpotifyHistoryExternalData &
  SpotifyHistoryInternalData;

export { SpotifyHistoryData, SpotifyHistoryExternalData };
