<template>
  <v-row>
    <v-col v-if="$slots['menu-left']" class="col-sm-4 col-md-3">
      <slot name="menu-left" />
    </v-col>

    <v-col>
      <router-view />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

const Page = defineComponent({
  name: 'Page',
});

export default Page;
</script>
