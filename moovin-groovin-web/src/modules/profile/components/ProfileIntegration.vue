<template>
  <v-card class="ProfileIntegration">
    <v-card-title>
      <slot name="title">
        {{ providerName }}
      </slot>
    </v-card-title>
    <v-card-text>
      <v-btn color="primary" @click="openAuthWindow(providerId)">
        <slot name="action"> Connect to {{ providerName }} </slot>
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';

import useOpenAuthWindow, { AuthProviders } from '@/modules/auth/composables/useOpenAuthWindow';

const ProfileIntegration = defineComponent({
  name: 'ProfileIntegration',
  props: {
    providerName: { type: String, required: true },
    providerId: { type: String as PropType<AuthProviders>, required: true },
  },
  setup() {
    const { openAuthWindow } = useOpenAuthWindow();

    return {
      openAuthWindow,
    };
  },
});

export default ProfileIntegration;
</script>
