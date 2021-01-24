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
      cors: false,
    });
    return router;
  };

  return router;
};

export { createRouter as default };
