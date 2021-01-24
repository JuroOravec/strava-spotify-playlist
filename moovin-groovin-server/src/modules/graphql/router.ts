import type {
  ServerModule,
  RouterCreator,
  Services,
  Handlers,
} from '../../lib/ServerModule';
import type { GraphqlData } from './data';
import assertApolloServer from './utils/assertApolloServer';

const createRouter = (): RouterCreator => {
  const router: RouterCreator = function router(
    this: ServerModule<Services, Handlers, GraphqlData>
  ) {
    assertApolloServer(this.data.apolloServer);
    const router = this.data.apolloServer.getMiddleware({
      path: '/graphql',
      // TODO: Allow to pass these options at module init
      cors: {
        // TODO: Set these values in config
        // TODO: When having multiple envs (e.g., prod and dev), do not include localhost on prod
        origin: [
          'https://moovingroovin.com',
          'https://www.moovingroovin.com',
          /^http\:\/\/localhost\:\d+/,
        ],
        credentials: true,
      },
    });
    return router;
  };

  return router;
};

export { createRouter as default };
