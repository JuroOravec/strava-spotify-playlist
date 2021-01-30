<template>
  <div class="WarningIrreversible">
    <v-icon color="red lighten-2">warning</v-icon>
    <span class="body-2 pl-2">This action cannot be undone. </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

const WarningIrreversible = defineComponent({
  name: 'WarningIrreversible',
});

export default WarningIrreversible;
</script>
