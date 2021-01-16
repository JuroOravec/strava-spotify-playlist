// TODO: nice to have - Revert the playlist order so latest is last
//                    - Don't know why that happened
// TODO: nice to have - make data module prop private to that module
//                    - and move the store implementations and caches to private data
// TODO: nice to have - add dependencies check when tring to install, so it's possible to track which module depends on which.
//                    - use that as the ModuleDeps type, but defined maybe like Vue does it with props (e.g. Object as () => XYZ)

import { Pool } from 'pg';

import './lib/env';
import createServerContextManager from './lib/manageServerContext';
import isMainProcess from './utils/isMainProcess';
import createBaseModule, { BaseModule } from './modules/base';
import createOpenApiModule, { OpenApiModule } from './modules/openapi';
import createRouterModule, { RouterModule } from './modules/router';
import createStoreConfigModule, {
  StoreConfigModule,
} from './modules/storeConfig';
import createStoreTokenModule, { StoreTokenModule } from './modules/storeToken';
import createStoreUserModule, { StoreUserModule } from './modules/storeUser';
import createStoreTrackModule, { StoreTrackModule } from './modules/storeTrack';
import createStorePlaylistModule, {
  StorePlaylistModule,
} from './modules/storePlaylist';
import createOAuthModule, { OAuthModule } from './modules/oauth';
import createOAuthGoogleModule, {
  OAuthGoogleModule,
} from './modules/oauthGoogle';
import createOAuthFacebookModule, {
  OAuthFacebookModule,
} from './modules/oauthFacebook';
import createOAuthSpotifyModule, {
  OAuthSpotifyModule,
} from './modules/oauthSpotify';
import createStravaModule, { StravaModule } from './modules/strava';
import createOAuthStravaModule, {
  OAuthStravaModule,
} from './modules/oauthStrava';
import createSpotifyModule, { SpotifyModule } from './modules/spotify';
import createSpotifyHistoryModule, {
  SpotifyHistoryModule,
} from './modules/spotifyHistory';
import createStravaWebhookModule, {
  StravaWebhookModule,
} from './modules/stravaWebhook';
import createStravaSpotifyModule, {
  StravaSpotifyModule,
} from './modules/stravaSpotify';
import createErrorHandlerModule, {
  ErrorHandlerModule,
} from './modules/errorHandler';
import createHostModule, { HostModule } from './modules/host';
import type { RoutersFn } from './modules/router/types';
import type { OpenApiSpecInputFn } from './modules/openapi/types';
import type { OAuthInputFn } from './modules/oauth/types';
import type { ServerModuleName } from './types';

type ServerModules = {
  [ServerModuleName.BASE]: BaseModule;
  [ServerModuleName.ERR_HANDLER]: ErrorHandlerModule;
  [ServerModuleName.HOST]: HostModule;
  [ServerModuleName.OAUTH]: OAuthModule;
  [ServerModuleName.OAUTH_GOOGLE]: OAuthGoogleModule;
  [ServerModuleName.OAUTH_FACEBOOK]: OAuthFacebookModule;
  [ServerModuleName.OAUTH_SPOTIFY]: OAuthSpotifyModule;
  [ServerModuleName.OAUTH_STRAVA]: OAuthStravaModule;
  [ServerModuleName.OPENAPI]: OpenApiModule;
  [ServerModuleName.ROUTER]: RouterModule;
  [ServerModuleName.SPOTIFY]: SpotifyModule;
  [ServerModuleName.SPOTIFY_HISTORY]: SpotifyHistoryModule;
  [ServerModuleName.STORE_PLAYLIST]: StorePlaylistModule;
  [ServerModuleName.STORE_CONFIG]: StoreConfigModule;
  [ServerModuleName.STORE_TOKEN]: StoreTokenModule;
  [ServerModuleName.STORE_TRACK]: StoreTrackModule;
  [ServerModuleName.STORE_USER]: StoreUserModule;
  [ServerModuleName.STRAVA]: StravaModule;
  [ServerModuleName.STRAVA_WEBHOOK]: StravaWebhookModule;
  [ServerModuleName.STRAVA_SPOTIFY]: StravaSpotifyModule;
};

const port = parseInt(process.env.PORT || '3000');

const main = async () => {
  // ///////////////////////////
  // BASE FUNCTIONALITY
  // ///////////////////////////

  const baseModule = createBaseModule();

  const hostModule = createHostModule({
    port,
    origin: isProduction() ? 'api.moovingroovin.com' : null,
    localtunnelEnabled: !isProduction(),
    localtunnelOptions: {
      subdomain: 'strava-spotify-playlist',
    },
  });

  const errorHandlerModule = createErrorHandlerModule();

  // ///////////////////////////
  // OPENAPI
  // ///////////////////////////

  const openApiModule = createOpenApiModule({
    apiSpecs: (({ modules }) => [
      {
        spec: modules.oauth.openapi(),
        pathPrefix: '/auth',
      },
      {
        spec: modules.stravaWebhook.openapi(),
        pathPrefix: '/strava/webhook',
      },
      modules.openapi.openapi(),
    ]) as OpenApiSpecInputFn<ServerModules>,
  });

  // ///////////////////////////
  // OAUTH
  // ///////////////////////////

  const oauthFacebookModule = createOAuthFacebookModule({
    clientId: process.env.OAUTH_FACEBOOK_CLIENT_ID || '',
    clientSecret: process.env.OAUTH_FACEBOOK_CLIENT_SECRET || '',
  });

  const oauthGoogleModule = createOAuthGoogleModule({
    clientId: process.env.OAUTH_GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.OAUTH_GOOGLE_CLIENT_SECRET || '',
  });

  const oauthSpotifyModule = createOAuthSpotifyModule({
    clientId: process.env.OAUTH_SPOTIFY_CLIENT_ID || '',
    clientSecret: process.env.OAUTH_SPOTIFY_CLIENT_SECRET || '',
    /** Ensure access token is valid for at least 5 minutes ahead of expiry */
    tokenExpiryCutoff: 5 * 60,
  });

  const oauthStravaModule = createOAuthStravaModule({
    clientId: process.env.OAUTH_STRAVA_CLIENT_ID || '',
    clientSecret: process.env.OAUTH_STRAVA_CLIENT_SECRET || '',
    /** Ensure access token is valid for at least 5 minutes ahead of expiry */
    tokenExpiryCutoff: 5 * 60,
  });

  const oauthModule = createOAuthModule({
    // TODO: Getting invalid redirect_uri when using localtunnel here
    // authCallbackUrl: `${localtunnel.url}/api/v1/strava/auth/callback`,
    callbackUrlRoot: `http://localhost:${port}/api/v1/auth`,
    providers: (({ modules }) => [
      {
        providerId: 'spotify',
        oauth: modules.oauthSpotify.oauth,
        loginHandler: modules.oauthSpotify.handlers.authLogin,
        callbackHandler: modules.oauthSpotify.handlers.authCallback,
      },
      {
        providerId: 'strava',
        oauth: modules.oauthStrava.oauth,
        loginHandler: modules.oauthStrava.handlers.authLogin,
        callbackHandler: modules.oauthStrava.handlers.authCallback,
      },
      {
        providerId: 'facebook',
        isLoginProvider: true,
        oauth: modules.oauthFacebook.oauth,
        loginHandler: modules.oauthFacebook.handlers.authLogin,
        callbackHandler: modules.oauthFacebook.handlers.authCallback,
      },
      {
        providerId: 'google',
        isLoginProvider: true,
        oauth: modules.oauthGoogle.oauth,
        loginHandler: modules.oauthGoogle.handlers.authLogin,
        callbackHandler: modules.oauthGoogle.handlers.authCallback,
      },
    ]) as OAuthInputFn<ServerModules>,
  });

  // ///////////////////////////
  // ROUTER
  // ///////////////////////////

  const routerModule = createRouterModule({
    rootPath: '/api/v1',
    routers: (({ modules }) => [
      // TODO: allow module or router creator fn to be passed to `router`.
      // If module passed, tries to call .router().
      // If routerCreator, calls it.
      // If router instance, uses it.
      // TODO: specify args in a separate field
      {
        router: modules.oauth.router?.({ mergeParams: true }),
        pathPrefix: '/auth',
      },
      {
        router: modules.stravaWebhook.router?.({ mergeParams: true }),
        pathPrefix: '/strava/webhook',
      },
    ]) as RoutersFn<ServerModules>,
  });

  // ///////////////////////////
  // STORES
  // ///////////////////////////

  // Create a single pool connection shared by the store modules
  const pool = new Pool({
    host: process.env.PG_DB_HOST,
    port: process.env.PG_DB_PORT
      ? Number.parseInt(process.env.PG_DB_PORT)
      : undefined,
    user: process.env.PG_DB_USER,
    password: process.env.PG_DB_PASSWORD,
    database: process.env.PG_DB_DATABASE,
    parseInputDatesAsUTC: true,
    application_name: 'strava-spotify-playlist-server',
  });

  const storeTokenModule = createStoreTokenModule({
    clientConfig: pool,
  });

  const storeUserModule = createStoreUserModule({
    clientConfig: pool,
  });

  const storeConfigModule = createStoreConfigModule({
    clientConfig: pool,
  });

  const storeTrackModule = createStoreTrackModule({
    clientConfig: pool,
  });

  const storePlaylistModule = createStorePlaylistModule({
    clientConfig: pool,
  });

  // ///////////////////////////
  // BUSINESS LOGIC
  // ///////////////////////////

  const stravaModule = createStravaModule({
    client_id: process.env.OAUTH_STRAVA_CLIENT_ID || '',
    client_secret: process.env.OAUTH_STRAVA_CLIENT_SECRET || '',
  });

  const stravaWebhookModule = createStravaWebhookModule({
    webhookCallbackUrl: `${localtunnel.url}/api/v1/strava/webhook/callback`,
  });

  const spotifyModule = createSpotifyModule({
    clientId: process.env.OAUTH_SPOTIFY_CLIENT_ID || '',
    clientSecret: process.env.OAUTH_SPOTIFY_CLIENT_SECRET || '',
  });

  const spotifyHistory = createSpotifyHistoryModule({
    tickPeriod: 20 * 60 * 1000,
  });

  const stravaSpotifyModule = createStravaSpotifyModule({
    appNamePublic: 'StravaSpotifyPlaylist',
  });

  // ///////////////////////////
  // MAIN
  // ///////////////////////////

  const { createServerContext } = createServerContextManager();

  const serverContext = createServerContext({
    name: 'StravaSpotifyPlaylist',
    // Note: The order of modules determines their install order
    modules: [
      baseModule,
      hostModule,
      oauthModule,
      oauthFacebookModule,
      oauthGoogleModule,
      oauthSpotifyModule,
      oauthStravaModule,
      openApiModule,
      storeUserModule,
      storeTokenModule,
      storeConfigModule,
      storeTrackModule,
      storePlaylistModule,
      spotifyModule,
      // Manage spotify history only on main process
      ...(isMainProcess() ? [spotifyHistory] : []),
      stravaModule,
      stravaWebhookModule,
      stravaSpotifyModule,
      routerModule,
      errorHandlerModule,
    ],
  });
  await serverContext.install();
  serverContext.listen(port);

  return serverContext;
};

const serverContext = main();

export default serverContext;
