<template>
  <v-footer class="AppFooter" app dark absolute> Save the songs that keep you moving. </v-footer>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

const AppFooter = defineComponent({
  name: 'AppFooter',
});

export default AppFooter;
</script>

<style lang="scss">
.AppFooter {
  display: none;
}
</style>
