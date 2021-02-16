<template>
  <v-snackbar
    v-bind="$attrs"
    class="NotifSnackbarError"
    :timeout="10000"
    color="red darken-1"
    v-on="$listeners"
  >
    {{ content }}
  </v-snackbar>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

const NotifSnackbarError = defineComponent({
  name: 'NotifSnackbarError',
  inheritAttrs: false,
  props: {
    content: { type: String, required: true },
  },
});

export default NotifSnackbarError;
</script>
