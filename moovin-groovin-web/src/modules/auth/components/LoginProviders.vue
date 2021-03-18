<template>
  <v-card class="LoginProviders">
    <v-list>
      <v-list-item
        v-for="loginProvider in loginProviders"
        :key="loginProvider.providerId"
        class="LoginProviders__login"
        :class="'LoginProviders__login--' + loginProvider.providerId"
        link
        @click="openAuthWindow(loginProvider.providerId, { onDidCloseWindow: refetch })"
      >
        <v-list-item-title>{{ loginProvider.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, unref } from '@vue/composition-api';

import useCurrentUser from '../composables/useCurrentUser';
import useOpenAuthWindow from '../composables/useOpenAuthWindow';
import useProviders from '../composables/useProviders';

const LoginProviders = defineComponent({
  name: 'LoginProviders',
  setup() {
    const { openAuthWindow } = useOpenAuthWindow();
    const { refetch } = useCurrentUser();
    const { providers } = useProviders();

    const loginProviders = computed(() => unref(providers).filter((p) => p.isAuthProvider));

    return {
      loginProviders,
      openAuthWindow,
      refetch,
    };
  },
});

export default LoginProviders;
</script>

<style lang="scss">
.LoginProviders {
}
</style>
