<template>
  <v-card class="LoginProviders">
    <v-list>
      <v-list-item
        v-for="loginProvider in loginProviders"
        :key="loginProvider.provider"
        class="LoginProviders__login"
        :class="'LoginProviders__login--' + loginProvider.provider"
        link
        @click="openAuthWindow(loginProvider.provider)"
      >
        <v-list-item-title>{{ loginProvider.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import useOpenAuthWindow, { AuthProviders } from '../composables/useOpenAuthWindow';

const loginProviders = [
  {
    provider: AuthProviders.FACEBOOK,
    title: 'Facebook',
  },
  {
    provider: AuthProviders.GOOGLE,
    title: 'Google',
  },
];

const LoginProviders = defineComponent({
  name: 'LoginProviders',
  setup() {
    const { openAuthWindow } = useOpenAuthWindow();
    return {
      loginProviders,
      openAuthWindow,
    };
  },
});

export default LoginProviders;
</script>

<style lang="scss">
.LoginProviders {
}
</style>
