<template>
  <v-snackbar v-bind="$attrs" class="NotifSnackbarConfirm" color="green darken-1" v-on="$listeners">
    {{ content }}
  </v-snackbar>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

const NotifSnackbarConfirm = defineComponent({
  name: 'NotifSnackbarConfirm',
  inheritAttrs: false,
  props: {
    content: { type: String, required: true },
  },
});

export default NotifSnackbarConfirm;
</script>
