interface OAuthSpotifyExternalData {
  clientId: string;
  clientSecret: string;
  /**
   * Tokens that have less than this much time before expiration will be refetche
   * even if not expired yet. Time in seconds.
   */
  tokenExpiryCutoff: number;
}

type OAuthSpotifyData = OAuthSpotifyExternalData;

export { OAuthSpotifyData, OAuthSpotifyExternalData };
