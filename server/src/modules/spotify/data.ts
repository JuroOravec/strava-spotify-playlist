import Spotify from 'spotify-web-api-node';

import type { SpotifyOptions } from './types';

type SpotifyExternalData = SpotifyOptions;

type SpotifyInternalData = {
  spotify: Spotify | null;
};

type SpotifyData = SpotifyExternalData & SpotifyInternalData;

export { SpotifyData, SpotifyExternalData };
