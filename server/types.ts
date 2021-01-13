export type SetRequiredFields<T, TFields extends keyof T> = Partial<T> &
  Required<Pick<T, TFields>>;

export type OptionalReadonly<T> = Readonly<T> | T;
export type OptionalPromise<T> = Promise<T> | T;

export enum ServerModuleName {
  BASE = 'base',
  ERR_HANDLER = 'errorHandler',
  OAUTH = 'oauth',
  OAUTH_FACEBOOK = 'oauthFacebook',
  OAUTH_GOOGLE = 'oauthGoogle',
  OAUTH_SPOTIFY = 'oauthSpotify',
  OAUTH_STRAVA = 'oauthStrava',
  OPENAPI = 'openapi',
  ROUTER = 'router',
  SPOTIFY = 'spotify',
  SPOTIFY_HISTORY = 'spotifyHistory',
  STORE_CONFIG = 'storeConfig',
  STORE_TOKEN = 'storeToken',
  STORE_USER = 'storeUser',
  STORE_TRACK = 'storeTrack',
  STORE_PLAYLIST = 'storePlaylist',
  STRAVA = 'strava',
  STRAVA_WEBHOOK = 'stravaWebhook',
  STRAVA_SPOTIFY = 'stravaSpotify',
}
