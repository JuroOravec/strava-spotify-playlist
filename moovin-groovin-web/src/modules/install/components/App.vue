<template>
  <v-app id="app" class="App">
    <router-view name="appbar" />
    <v-main>
      <v-container>
        <AuthGuard>
          <router-view name="default" />
        </AuthGuard>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import AuthGuard from '@/modules/auth/components/AuthGuard.vue';

const App = defineComponent({
  name: 'App',
  components: {
    AuthGuard,
  },
});

export default App;
</script>

<style lang="scss">
@import '~@/plugins/vuetify/vuetify.scss';
@import '~../styles/main.scss';

.App {
}
</style>
