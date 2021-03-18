// TODO: docs - Document the tutorial on how to do proper authentication on endpoints
// TODO: docs - Document monorepo https://medium.com/@NiGhTTraX/how-to-set-up-a-typescript-monorepo-with-lerna-c6acda7d4559
// TODO: docs - Document reading stats for cloudfront https://console.aws.amazon.com/cloudfront/v2/home#/monitoring/E36OZZ9WTFU0V1
// TODO: docs - Document Sentry

// TODO: nice to have - make data module prop private to that module
//                    - and move the store implementations and caches to private data
// TODO: nice to have - add dependencies check when tring to install, so it's possible to track which module depends on which.
//                    - use that as the ModuleDeps type, but defined maybe like Vue does it with props (e.g. Object as () => XYZ)
// TODO: nice to have - Add support for delete request webhook for oauth providers (FB, google, ...)
// TODO: nice to have - Set caching for S3 files (see https://www.gauntface.com/blog/2020/static-site-hosting-on-aws/)
// TODO: nice to have - Allow to pass arrays to options object versions of routers and openapi input
// TODO: nice to have - Allow to pass modules to OAuthModuleConfig.providers
// TODO: nice to have - Update the types of ServerModule similarly to ResolverContext so individual modules can
//                      extend the common interface
// TODO: nice to have - Type SQL queries (see https://github.com/adelsz/pgtyped)
// TODO: nice to have - Flyway DB migrations (see https://flywaydb.org/)
// TODO: nice to have - Build server with Webpack so we can import shared files directly instead of through top-level import
// TODO: nice to have - Update the security policy to allow only ports 80, 443, 3000
// TODO: nice to have - In-app analytics (both FE and BE) - https://github.com/Open-Web-Analytics/Open-Web-Analytics/wiki/Tracker or mixpanel?
// TODO: nice to have - Use proxy with https for analytics endpoint to avoid ad blockers (https://analytics.moovingroovin.com)
// TODO: nice to have - Use proxy with https for sentry endpoints to avoid ad blockers (https://telemetry.moovingroovin.com)
//                       - https://docs.aws.amazon.com/AmazonS3/latest/userguide/website-hosting-custom-domain-walkthrough.html
//                       - https://aws.amazon.com/premiumsupport/knowledge-center/redirect-domain-route-53/
//                       - https://stackoverflow.com/questions/62540038/how-to-forward-my-domain-registered-with-aws-route53-to-google-my-business
//                       - https://stackoverflow.com/questions/45333803/redirect-to-domain-from-subdomain-aws-route53
// TODO: nice to have - Rename SafeInvoke to capture or captureError
// TODO: nice to have - ETA as templating engine? https://eta.js.org/docs/examples/express

import { Pool } from 'pg';
import { v5 as uuidV5 } from 'uuid';
import isNil from 'lodash/isNil';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import ms from 'ms';

import './lib/env';
import createServerContextManager from './lib/manageServerContext';
import type { ModuleContext } from './lib/ServerModule';
import { isProduction, isMainProcess } from './utils/env';
import createAnalyticsModule from './modules/analytics';
import { mixpanelPlugin } from './modules/analytics/plugins';
import createBaseModule from './modules/base';
import createSessionModule from './modules/session';
import createOpenApiModule from './modules/openapi';
import createRouterModule from './modules/router';
import createGraphqlModule from './modules/graphql';
import createPrismaModule from './modules/prisma';
import createStoreConfigModule from './modules/storeConfig';
import createStoreTokenModule from './modules/storeToken';
import createStoreUserModule from './modules/storeUser';
import createStoreSessionModule from './modules/storeSession';
import createStoreTrackModule from './modules/storeTrack';
import createStorePlaylistModule from './modules/storePlaylist';
import createOAuthModule from './modules/oauth';
import createOAuthFacebookModule from './modules/oauthFacebook';
import createOAuthGoogleModule from './modules/oauthGoogle';
// import createOAuthAppleMusicModule from './modules/oauthAppleMusic';
import createOAuthSpotifyModule from './modules/oauthSpotify';
import createOAuthStravaModule from './modules/oauthStrava';
import createApiStravaModule from './modules/apiStrava';
import createApiSpotifyModule from './modules/apiSpotify';
import createTrackHistoryModule from './modules/trackHistory';
import createStravaWebhookModule from './modules/stravaWebhook';
import createPlaylistAppleModule from './modules/playlistApple';
import createPlaylistSpotifyModule from './modules/playlistSpotify';
import createPlaylistModule from './modules/playlist';
import createErrorHandlerModule from './modules/errorHandler';
import createHostModule from './modules/host';
import type { OAuthInputFn } from './modules/oauth/types';
import type AppServerModules from './types/AppServerModules';
import { ActivityProvider, AuthProvider, PlaylistProvider } from './types';

const port = parseInt(process.env.PORT || '3000');
const appName = 'MoovinGroovin';

const main = async () => {
  // ///////////////////////////
  // BASE FUNCTIONALITY
  // ///////////////////////////

  const baseModule = createBaseModule();

  const hostModule = createHostModule({
    port,
    origin: isProduction() ? 'https://api.moovingroovin.com' : null,
    // NOTE: When in dev, use 'http://localhost:${port}/...' instead of localtunnel.
    // Getting invalid redirect_uri when using localtunnel
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

  const errorHandlerModule = createErrorHandlerModule({
    sentry: (ctx) => ({
      dsn: process.env.ANALYTICS_SENTRY_DSN,
      integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({
          app: ctx.app,
        }),
      ],
      tracesSampleRate: 0.7,
    }),
    sentryRequestHandler: {
      ip: true,
    },
  });

  const graphqlModule = createGraphqlModule({
    apolloConfig: (ctx: ModuleContext<AppServerModules>) => [
      ctx.modules.storeUser,
      ctx.modules.storeConfig,
      ctx.modules.storePlaylist,
      ctx.modules.oauth,
      { debug: !isProduction() },
    ],
    schemaConfig: {
      inheritResolversFromInterfaces: true,
      allowUndefinedInResolve: false,
    },
  });

  const analyticsModule = createAnalyticsModule({
    analyticsOptions: {
      app: appName,
      version: '1.0.0',
      debug: !isProduction(),
      plugins: [
        mixpanelPlugin({
          token: process.env.ANALYTICS_MIXPANEL_TOKEN ?? '',
          api_host: process.env.ANALYTICS_MIXPANEL_HOST,
          debug: !isProduction(),
        }),
      ],
    },
  });

  // ///////////////////////////
  // OPENAPI
  // ///////////////////////////

  const openApiModule = createOpenApiModule({
    apiSpecs: ({ modules }: ModuleContext<AppServerModules>) => [
      {
        spec: modules.oauth,
        pathPrefix: '/auth',
      },
      {
        spec: modules.session,
        pathPrefix: '/auth',
      },
      {
        spec: modules.stravaWebhook,
        pathPrefix: '/strava/webhook',
      },
      modules.graphql,
      modules.openapi,
    ],
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

  // const oauthAppleMusicModule = createOAuthAppleMusicModule({
  //   teamId: process.env.OAUTH_APPLE_MUSIC_TEAM_ID || '',
  //   keyId: process.env.OAUTH_APPLE_MUSIC_KEY_ID || '',
  // });

  const oauthSpotifyModule = createOAuthSpotifyModule({
    clientId: process.env.OAUTH_SPOTIFY_CLIENT_ID || '',
    clientSecret: process.env.OAUTH_SPOTIFY_CLIENT_SECRET || '',
  });

  const oauthStravaModule = createOAuthStravaModule({
    clientId: process.env.OAUTH_STRAVA_CLIENT_ID || '',
    clientSecret: process.env.OAUTH_STRAVA_CLIENT_SECRET || '',
  });

  const oauthModule = createOAuthModule({
    callbackUrlRoot: `/api/v1/auth`,
    // Passport is initialized in session module to work correctly
    initializePassport: false,
    /** Ensure access token is valid for at least 5 minutes ahead of expiry */
    tokenExpiryCutoff: ms('5m'),
    providers: (({ modules }) => [
      // Auth
      {
        providerId: AuthProvider.FACEBOOK,
        isAuthProvider: true,
        oauth: modules.oauthFacebook.oauth,
        loginHandler: modules.oauthFacebook.handlers.authLogin,
        callbackHandler: modules.oauthFacebook.handlers.authCallback,
      },
      {
        providerId: AuthProvider.GOOGLE,
        isAuthProvider: true,
        oauth: modules.oauthGoogle.oauth,
        loginHandler: modules.oauthGoogle.handlers.authLogin,
        callbackHandler: modules.oauthGoogle.handlers.authCallback,
      },
      // Playlist
      // {
      //   providerId: PlaylistProvider.APPLE_MUSIC,
      //   oauth: modules.oauthAppleMusic.oauth,
      //   loginHandler: modules.oauthAppleMusic.handlers.authLogin,
      //   callbackHandler: modules.oauthAppleMusic.handlers.authCallback,
      // },
      {
        providerId: PlaylistProvider.SPOTIFY,
        oauth: modules.oauthSpotify.oauth,
        loginHandler: modules.oauthSpotify.handlers.authLogin,
        callbackHandler: modules.oauthSpotify.handlers.authCallback,
      },
      // Activity
      {
        providerId: ActivityProvider.STRAVA,
        oauth: modules.oauthStrava.oauth,
        loginHandler: modules.oauthStrava.handlers.authLogin,
        callbackHandler: modules.oauthStrava.handlers.authCallback,
      },
    ]) as OAuthInputFn<AppServerModules>,
  });

  // ///////////////////////////
  // ROUTER
  // ///////////////////////////

  const routerModule = createRouterModule({
    rootPath: '/api/v1',
    routers: ({ modules }: ModuleContext<AppServerModules>) => [
      {
        router: modules.oauth,
        routerOptions: { mergeParams: true },
        pathPrefix: '/auth',
      },
      {
        router: modules.session,
        routerOptions: { mergeParams: true },
        pathPrefix: '/auth',
      },
      {
        router: modules.stravaWebhook,
        routerOptions: { mergeParams: true },
        pathPrefix: '/strava/webhook',
      },
      modules.graphql,
    ],
  });

  // ///////////////////////////
  // STORES
  // ///////////////////////////

  const prismaModule = createPrismaModule({
    clientOptions: {
      log: !isProduction() ? ['info', 'warn'] : ['query', 'info', 'warn'],
    },
  });

  // Create a single pool connection shared by the store modules
  const pool = new Pool({
    host: process.env.DB_PG_HOST,
    port: process.env.DB_PG_PORT
      ? Number.parseInt(process.env.DB_PG_PORT)
      : undefined,
    user: process.env.DB_PG_USER,
    password: process.env.DB_PG_PASSWORD,
    database: process.env.DB_PG_DATABASE,
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
  // EXTERNAL APIS
  // ///////////////////////////

  const apiSpotifyModule = createApiSpotifyModule({
    clientId: process.env.OAUTH_SPOTIFY_CLIENT_ID || '',
    clientSecret: process.env.OAUTH_SPOTIFY_CLIENT_SECRET || '',
  });

  const apiStravaModule = createApiStravaModule({
    client_id: process.env.OAUTH_STRAVA_CLIENT_ID || '',
    client_secret: process.env.OAUTH_STRAVA_CLIENT_SECRET || '',
  });

  // ///////////////////////////
  // BUSINESS LOGIC
  // ///////////////////////////

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

  const playlistAppleModule = createPlaylistAppleModule();
  const playlistSpotifyModule = createPlaylistSpotifyModule();

  const trackHistory = createTrackHistoryModule({
    tickPeriod: 20 * 60 * 1000,
  });

  const playlistModule = createPlaylistModule({
    appNamePublic: appName,
    playlistProviders: ({ modules }: ModuleContext<AppServerModules>) => [
      // {
      //   providerId: PlaylistProvider.APPLE_MUSIC,
      //   ...modules.playlistApple.services,
      // },
      {
        providerId: PlaylistProvider.SPOTIFY,
        ...modules.playlistSpotify.services,
      },
    ],
  });

  // ///////////////////////////
  // MAIN
  // ///////////////////////////

  const { createServerContext } = createServerContextManager();

  const serverContext = createServerContext({
    name: appName,
    // Note: The order of modules determines their install order
    modules: [
      prismaModule,
      storeUserModule,
      storeTokenModule,
      storeConfigModule,
      storeTrackModule,
      storePlaylistModule,
      storeSessionModule,
      baseModule,
      hostModule,
      oauthModule,
      // oauthAppleMusicModule,
      oauthFacebookModule,
      oauthGoogleModule,
      oauthSpotifyModule,
      oauthStravaModule,
      sessionModule,
      openApiModule,
      // Manage track history only on main process
      ...(isMainProcess() ? [trackHistory] : []),
      apiSpotifyModule,
      apiStravaModule,
      stravaWebhookModule,
      // playlistAppleModule,
      playlistSpotifyModule,
      playlistModule,
      graphqlModule,
      routerModule,
      errorHandlerModule,
      analyticsModule,
    ],
  });
  await serverContext.install();
  serverContext.listen(port);

  return serverContext;
};

const serverContext = main();

export default serverContext;
