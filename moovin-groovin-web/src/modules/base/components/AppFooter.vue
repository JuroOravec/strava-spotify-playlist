<template>
  <v-footer class="AppFooter" app absolute>
    <v-row class="AppFooter__container text-body-2">
      <v-col cols="auto">
        <router-link :to="{ name: BaseRoute.PRIVACY_POLICY }" class="AppFooter__link"
          >Privacy</router-link
        >
      </v-col>
      <v-col cols="auto" class="px-0"> ∙ </v-col>
      <v-col cols="auto">
        Created by
        <a
          href="https://github.com/JuroOravec"
          target="_blank"
          rel="noopener"
          class="AppFooter__link"
        >
          Juro Oravec
        </a>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import { BaseRoute } from '../types';

const AppFooter = defineComponent({
  name: 'AppFooter',
  setup() {
    return {
      BaseRoute,
    };
  },
});

export default AppFooter;
</script>

<style lang="scss">
.AppFooter {
  &__container {
    justify-content: center;
  }
  &__link {
    font-weight: bold;
  }
}
</style>
