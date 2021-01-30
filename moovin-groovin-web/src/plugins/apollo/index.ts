import type { VueConstructor } from 'vue';
import { provide } from '@vue/composition-api';
import { ApolloClients } from '@vue/apollo-composable';
import VueApollo from 'vue-apollo';
import type { ApolloClient } from 'apollo-client';

import type { EnvironmentConfig } from '../config/config';
import createApolloClients, { VueApolloClients } from './clients';

interface ApolloPlugin {
  clients: VueApolloClients;
  provider: VueApollo;
}

const installApollo = (vueClass: VueConstructor, config: EnvironmentConfig): ApolloPlugin => {
  vueClass.use(VueApollo);

  // Note: VueApollo is using types from 'apollo-client' while we use '@apollo/client/core'
  // so we have to cast them.
  const apolloClients = createApolloClients(config);
  const castedApolloClients = (apolloClients as unknown) as Record<string, ApolloClient<any>>;

  const apolloProvider = new VueApollo({
    clients: castedApolloClients,
    defaultClient: castedApolloClients.default,
    errorHandler: (error) => console.error('[VueApollo: error]', error),
  });

  vueClass.mixin({
    name: 'ApolloMixin',
    setup() {
      provide(ApolloClients, apolloClients);
    },
  });

  return {
    clients: apolloClients,
    provider: apolloProvider,
  };
};

export default installApollo;
