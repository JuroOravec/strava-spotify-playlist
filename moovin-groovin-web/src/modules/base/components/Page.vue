<template>
  <v-row>
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
