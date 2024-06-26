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

interface ApolloClientsOptions {
  onError?: (err: Error) => void;
}

const createApolloClients = (
  config: EnvironmentConfig,
  options: ApolloClientsOptions = {}
): VueApolloClients => {
  const { onError: onApolloError = console.error } = options;

  const serverHttpLink = createHttpLink({
    uri: config.GRAPHQL_URL,
    credentials: 'include',
  });

  const onErrorLink = onError((errorResponse) => {
    const { graphQLErrors = [], networkError = null } = errorResponse;
    graphQLErrors
      .filter((error) => error?.extensions?.code !== 'UNAUTHENTICATED')
      .forEach((error) => onApolloError(error));

    if (networkError) onApolloError(networkError);
  });

  const defaultOptions: DefaultOptions = {
    watchQuery: { errorPolicy: 'all', fetchPolicy: 'cache-and-network' },
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
      UserConfig: {
        merge: true,
      },
      Query: {
        fields: {
          getCurrentUserConfig: { merge: true },
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
export type { VueApolloClients, ApolloClientsOptions };
