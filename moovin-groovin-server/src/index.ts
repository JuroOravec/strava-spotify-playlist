// TODO: Document the tutorial on how to do proper authentication on endpoints

// TODO: Add logout endpoint that calls req.logout (see passport.js)

// TODO: nice to have - Revert the playlist order so latest is last
//                    - Don't know why that happened
// TODO: nice to have - make data module prop private to that module
//                    - and move the store implementations and caches to private data
// TODO: nice to have - add dependencies check when tring to install, so it's possible to track which module depends on which.
//                    - use that as the ModuleDeps type, but defined maybe like Vue does it with props (e.g. Object as () => XYZ)
// TODO: nice to have - Add support for delete request webhook for oauth providers (FB, google, ...)
// TODO: nice to have - Set caching for S3 files (see https://www.gauntface.com/blog/2020/static-site-hosting-on-aws/)

import { Pool } from 'pg';
import { v5 as uuidV5 } from 'uuid';
import isNil from 'lodash/isNil';

import './lib/env';
import createServerContextManager from './lib/manageServerContext';
import isMainProcess from './utils/isMainProcess';
import isProduction from './utils/isProduction';
import createBaseModule, { BaseModule } from './modules/base';
import createSessionModule, { SessionModule } from './modules/session';
import createOpenApiModule, { OpenApiModule } from './modules/openapi';
import createRouterModule, { RouterModule } from './modules/router';
import createGraphqlModule, { GraphqlModule } from './modules/graphql';
import createStoreConfigModule, {
  StoreConfigModule,
} from './modules/storeConfig';
import createStoreTokenModule, { StoreTokenModule } from './modules/storeToken';
import createStoreUserModule, { StoreUserModule } from './modules/storeUser';
import createStoreSessionModule, {
  StoreSessionModule,
} from './modules/storeSession';
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
import type { RouterInputFn } from './modules/router/types';
import type { OpenApiSpecInputFn } from './modules/openapi/types';
import type { OAuthInputFn } from './modules/oauth/types';
import type { GraphqlApolloConfigInputFn } from './modules/graphql/types';
import type { ServerModuleName } from './types';

type AppServerModules = {
  [ServerModuleName.BASE]: BaseModule;
  [ServerModuleName.ERR_HANDLER]: ErrorHandlerModule;
  [ServerModuleName.HOST]: HostModule;
  [ServerModuleName.GRAPHQL]: GraphqlModule;
  [ServerModuleName.OAUTH]: OAuthModule;
  [ServerModuleName.OAUTH_GOOGLE]: OAuthGoogleModule;
  [ServerModuleName.OAUTH_FACEBOOK]: OAuthFacebookModule;
  [ServerModuleName.OAUTH_SPOTIFY]: OAuthSpotifyModule;
  [ServerModuleName.OAUTH_STRAVA]: OAuthStravaModule;
  [ServerModuleName.OPENAPI]: OpenApiModule;
  [ServerModuleName.ROUTER]: RouterModule;
  [ServerModuleName.SESSION]: SessionModule;
  [ServerModuleName.SPOTIFY]: SpotifyModule;
  [ServerModuleName.SPOTIFY_HISTORY]: SpotifyHistoryModule;
  [ServerModuleName.STORE_PLAYLIST]: StorePlaylistModule;
  [ServerModuleName.STORE_CONFIG]: StoreConfigModule;
  [ServerModuleName.STORE_TOKEN]: StoreTokenModule;
  [ServerModuleName.STORE_TRACK]: StoreTrackModule;
  [ServerModuleName.STORE_USER]: StoreUserModule;
  [ServerModuleName.STORE_SESSION]: StoreSessionModule;
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
    origin: isProduction() ? 'https://api.moovingroovin.com' : null,
    localtunnelEnabled: Boolean(
      !isProduction() && process.env.LOCALTUNNEL_ENABLED
    ),
    localtunnelOptions: {
      subdomain: 'moovin-groovin',
    },
  });

  const sessionModule = createSessionModule({
    initializePassport: true,
  });

  const errorHandlerModule = createErrorHandlerModule();

  const graphqlModule = createGraphqlModule({
    apolloConfig: ((ctx) => [
      ctx.modules.storeUser,
      { debug: !isProduction() },
    ]) as GraphqlApolloConfigInputFn<AppServerModules>,
    schemaConfig: {
      inheritResolversFromInterfaces: true,
      allowUndefinedInResolve: false,
    },
  });

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
      modules.graphql,
      modules.openapi,
    ]) as OpenApiSpecInputFn<AppServerModules>,
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
    // NOTE: When in dev, use 'http://localhost:${port}/...' instead of localtunnel.
    // Getting invalid redirect_uri when using localtunnel here
    callbackUrlRoot: `/api/v1/auth`,
    // Passport is initialized in session module to work correctly
    initializePassport: false,
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
    ]) as OAuthInputFn<AppServerModules>,
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
        router: modules.oauth.router({ mergeParams: true }),
        pathPrefix: '/auth',
      },
      {
        router: modules.stravaWebhook.router({ mergeParams: true }),
        pathPrefix: '/strava/webhook',
      },
      modules.graphql.router(),
    ]) as RouterInputFn<AppServerModules>,
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
    application_name: 'moovin-groovin-server',
  });

  const storeTokenModule = createStoreTokenModule({
    clientConfig: pool,
  });

  const storeUserModule = createStoreUserModule({
    clientConfig: pool,
  });

  const storeSessionModule = createStoreSessionModule({
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
    webhookCallbackUrl: `/api/v1/strava/webhook/callback`,
    // Only single process should handle the subscription
    subscription: isMainProcess(),
    // Always override on prod so sub callback url always points to prod
    overrideSubscription: isProduction(),
    // Allow the verify token to change between runs but still consistent across pm2 processes.
    verifyToken: !isNil(process.env.STRAVA_VERIFY_TOKEN_SEED)
      ? uuidV5(
          process.env.STRAVA_VERIFY_TOKEN_SEED,
          'c8d36004-8e1f-4488-b575-98d151a4f504'
        )
      : undefined,
  });

  const spotifyModule = createSpotifyModule({
    clientId: process.env.OAUTH_SPOTIFY_CLIENT_ID || '',
    clientSecret: process.env.OAUTH_SPOTIFY_CLIENT_SECRET || '',
  });

  const spotifyHistory = createSpotifyHistoryModule({
    tickPeriod: 20 * 60 * 1000,
  });

  const stravaSpotifyModule = createStravaSpotifyModule({
    appNamePublic: 'MoovinGroovin',
  });

  // ///////////////////////////
  // MAIN
  // ///////////////////////////

  const { createServerContext } = createServerContextManager();

  const serverContext = createServerContext({
    name: 'MoovinGroovin',
    // Note: The order of modules determines their install order
    modules: [
      storeUserModule,
      storeTokenModule,
      storeConfigModule,
      storeTrackModule,
      storePlaylistModule,
      storeSessionModule,
      baseModule,
      hostModule,
      oauthModule,
      oauthFacebookModule,
      oauthGoogleModule,
      oauthSpotifyModule,
      oauthStravaModule,
      sessionModule,
      openApiModule,
      spotifyModule,
      // Manage spotify history only on main process
      ...(isMainProcess() ? [spotifyHistory] : []),
      stravaModule,
      stravaWebhookModule,
      stravaSpotifyModule,
      graphqlModule,
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
