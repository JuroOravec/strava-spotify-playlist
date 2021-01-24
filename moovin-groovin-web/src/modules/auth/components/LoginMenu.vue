<template>
  <v-menu class="LoginMenu" v-bind="$attrs" :offset-y="true" v-on="$listeners">
    <template #activator="{ on, attrs }">
      <LoginAvatar v-bind="attrs" v-on="on" />
    </template>
    <LoginProviders />
  </v-menu>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import LoginAvatar from './LoginAvatar.vue';
import LoginProviders from './LoginProviders.vue';

const LoginMenu = defineComponent({
  name: 'LoginMenu',
  components: {
    LoginAvatar,
    LoginProviders,
  },
  inheritAttrs: false,
});

export default LoginMenu;
</script>

<style lang="scss">
.LoginMenu {
}
</style>
