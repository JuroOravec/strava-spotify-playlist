<template>
  <component
    :is="notifComponent"
    v-model="isNotifActive"
    v-bind="notifAttrs"
    class="NotifSnackbar"
    bottom
    right
  />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import useNotifSnackbar from '../composables/useNotifSnackbar';

const NotifSnackbar = defineComponent({
  name: 'NotifSnackbar',
  setup() {
    const { isNotifActive, notifComponent, notifAttrs } = useNotifSnackbar();
    return {
      isNotifActive,
      notifComponent,
      notifAttrs,
    };
  },
});

export default NotifSnackbar;
</script>
