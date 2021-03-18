export type SetRequiredFields<T, TFields extends keyof T> = Partial<T> &
  Required<Pick<T, TFields>>;

export enum ServerModuleName {
  ANALYTICS = 'analytics',
  API_SPOTIFY = 'apiSpotify',
  API_STRAVA = 'apiStrava',
  BASE = 'base',
  ERR_HANDLER = 'errorHandler',
  HOST = 'host',
  GRAPHQL = 'graphql',
  OAUTH = 'oauth',
  OAUTH_APPLE_MUSIC = 'oauthAppleMusic',
  OAUTH_FACEBOOK = 'oauthFacebook',
  OAUTH_GOOGLE = 'oauthGoogle',
  OAUTH_SPOTIFY = 'oauthSpotify',
  OAUTH_STRAVA = 'oauthStrava',
  OPENAPI = 'openapi',
  PLAYLIST = 'playlist',
  PLAYLIST_APPLE = 'playlistApple',
  PLAYLIST_SPOTIFY = 'playlistSpotify',
  PRISMA = 'prisma',
  ROUTER = 'router',
  SESSION = 'session',
  STORE_CONFIG = 'storeConfig',
  STORE_TOKEN = 'storeToken',
  STORE_USER = 'storeUser',
  STORE_SESSION = 'storeSession',
  STORE_TRACK = 'storeTrack',
  STORE_PLAYLIST = 'storePlaylist',
  STRAVA_WEBHOOK = 'stravaWebhook',
  TRACK_HISTORY = 'trackHistory',
}

export enum AuthProvider {
  FACEBOOK = 'facebook',
  GOOGLE = 'google',
}

export enum PlaylistProvider {
  // APPLE_MUSIC = 'apple-music',
  SPOTIFY = 'spotify',
}

export enum ActivityProvider {
  STRAVA = 'strava',
}
