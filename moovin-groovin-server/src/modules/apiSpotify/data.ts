import type Spotify from 'spotify-web-api-node';

import type { SpotifyOptions } from './types';

type ApiSpotifyExternalData = SpotifyOptions;

type ApiSpotifyInternalData = {
  spotify: Spotify | null;
};

type ApiSpotifyData = ApiSpotifyExternalData & ApiSpotifyInternalData;

export { ApiSpotifyData, ApiSpotifyExternalData };
