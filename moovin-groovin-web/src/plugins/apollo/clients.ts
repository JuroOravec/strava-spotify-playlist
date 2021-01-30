import {
  ApolloClient,
  DefaultOptions,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';

import type { EnvironmentConfig } from '../config/config';
import possibleTypes from './possibleTypes';

interface VueApolloClients {
  default: ApolloClient<any>;
}

const createApolloClients = (config: EnvironmentConfig): VueApolloClients => {
  const serverHttpLink = createHttpLink({
    uri: config.GRAPHQL_URL,
    credentials: 'include',
  });

  const onErrorLink = onError((errorResponse) => {
    const { graphQLErrors = [], networkError = null } = errorResponse;
    graphQLErrors
      .filter((error) => error?.extensions?.code !== 'UNAUTHENTICATED')
      .forEach((error) => console.error(error));

    if (networkError) console.error(networkError);
  });

  const defaultOptions: DefaultOptions = {
    watchQuery: { errorPolicy: 'all' },
    query: { errorPolicy: 'all', fetchPolicy: 'cache-first' },
    mutate: { errorPolicy: 'all' },
  };

  const cache = new InMemoryCache({
    possibleTypes,
    typePolicies: {
      User: {
        keyFields: ['userId'],
        fields: {
          providers: {
            merge: (existing, incoming) => incoming,
          },
        },
      },
    },
  });

  const serverClient = new ApolloClient({
    link: ApolloLink.from([onErrorLink, serverHttpLink]),
    cache,
    defaultOptions,
    name: 'MoovinGroovin',
    assumeImmutableResults: true,
    credentials: 'include',
    connectToDevTools: true,
  });

  return {
    default: serverClient,
  };
};

export default createApolloClients;
export type { VueApolloClients };
