import {
  ApolloClient,
  DefaultOptions,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';

import possibleTypes from './possibleTypes';

interface VueApolloClients {
  default: ApolloClient<any>;
}

const createApolloClients = (): VueApolloClients => {
  const serverHttpLink = createHttpLink({
    // TODO: Move these to env config
    uri: 'https://api.moovingroovin.com/api/v1/graphql',
    // uri: 'http://localhost:3000/api/v1/graphql',
    credentials: 'include',
  });

  const onErrorLink = onError((errorResponse) => {
    const { graphQLErrors = [], networkError = null } = errorResponse;
    graphQLErrors.forEach((error) => console.error(error));

    if (networkError) console.error(networkError);
  });

  const defaultOptions: DefaultOptions = {
    watchQuery: { errorPolicy: 'all' },
    query: { errorPolicy: 'all' },
    mutate: { errorPolicy: 'all' },
  };

  const cache = new InMemoryCache({
    possibleTypes,
  });

  const serverClient = new ApolloClient({
    link: ApolloLink.from([onErrorLink, serverHttpLink]),
    cache,
    defaultOptions,
    name: 'MoovinGroovin',
    assumeImmutableResults: true,
    credentials: 'include',
  });

  return {
    default: serverClient,
  };
};

export { createApolloClients as default, VueApolloClients };
