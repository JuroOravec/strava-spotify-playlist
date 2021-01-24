import type { ApolloServer } from 'apollo-server-express';

import type {
  GraphqlApolloConfigInput,
  GraphqlApolloConfigInputFn,
  GraphqlSchemaConfigInput,
  GraphqlSchemaConfigInputFn,
} from './types';

interface GraphqlExternalData {
  apolloConfig: GraphqlApolloConfigInput | GraphqlApolloConfigInputFn<any>;
  schemaConfig: GraphqlSchemaConfigInput | GraphqlSchemaConfigInputFn<any>;
}

interface GraphqlInternalData {
  apolloServer: ApolloServer | null;
}

type GraphqlData = GraphqlExternalData & GraphqlInternalData;

export { GraphqlData };
