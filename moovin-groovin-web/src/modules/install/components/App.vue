<template>
  <v-app id="app" class="App">
    <router-view name="appbar" />
    <v-main>
      <v-container>
        <router-view name="default" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import Navbar from '@/modules/base/components/Navbar.vue';

const App = defineComponent({
  name: 'App',
  components: {
    Navbar,
  },
});

export default App;
</script>

<style lang="scss">
.App {
}
</style>
>
