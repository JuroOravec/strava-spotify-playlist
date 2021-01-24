import path from 'path';

import ServerModule, { Services, Handlers } from '../../lib/ServerModule';
import { ServerModuleName } from '../../types';
import type { GraphqlData } from './data';
import createInstaller from './install';
import createCloser from './close';
import createRouter from './router';
import createGraphql from './graphql';

type GraphqlModuleOptions = Partial<GraphqlData>;
type GraphqlModule = ServerModule<Services, Handlers, GraphqlData>;

const createGraphqlModule = (
  options: GraphqlModuleOptions = {}
): GraphqlModule => {
  const { apolloConfig = {}, schemaConfig = {} } = options;

  return new ServerModule({
    name: ServerModuleName.GRAPHQL,
    install: createInstaller(),
    close: createCloser(),
    router: createRouter(),
    openapi: path.join(__dirname, './api.yml'),
    graphql: createGraphql(),
    data: {
      ...options,
      apolloConfig,
      schemaConfig,
      apolloServer: null,
    },
  });
};

export { createGraphqlModule as default, GraphqlModule, GraphqlModuleOptions };
