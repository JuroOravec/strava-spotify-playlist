<template>
  <v-btn class="LoginAvatar" outlined color="#dddddd" v-bind="$attrs" v-on="$listeners">
    LOGIN
  </v-btn>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

const LoginAvatar = defineComponent({
  name: 'LoginAvatar',
  inheritAttrs: false,
});

export default LoginAvatar;
</script>

<style lang="scss">
.LoginAvatar {
}
</style>
