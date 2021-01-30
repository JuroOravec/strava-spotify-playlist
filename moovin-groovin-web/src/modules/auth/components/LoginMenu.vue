<template>
  <v-menu class="LoginMenu" v-bind="$attrs" :offset-y="true" v-on="$listeners">
    <template #activator="{ on, attrs }">
      <LoginAvatar v-bind="attrs" v-on="on" />
    </template>
    <LoginProviders v-if="!user" />

    <v-list v-else>
      <v-list-item class="LoginProviders__login" link @click="logout">
        <v-list-item-title> Logout </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import useCurrentUser from '../composables/useCurrentUser';
import LoginAvatar from './LoginAvatar.vue';
import LoginProviders from './LoginProviders.vue';

const LoginMenu = defineComponent({
  name: 'LoginMenu',
  components: {
    LoginAvatar,
    LoginProviders,
  },
  inheritAttrs: false,
  setup() {
    const { user, logout } = useCurrentUser();

    return {
      user,
      logout,
    };
  },
});

export default LoginMenu;
</script>

<style lang="scss">
.LoginMenu {
}
</style>
