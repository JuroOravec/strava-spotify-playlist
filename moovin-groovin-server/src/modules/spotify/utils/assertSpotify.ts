import type Spotify from 'spotify-web-api-node';

function assertSpotify(spotifyClient: Spotify | null): asserts spotifyClient {
  if (!spotifyClient) {
    throw Error(`Failed to access Spotify API`);
  }
}

export default assertSpotify;
