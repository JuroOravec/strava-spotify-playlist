<template>
  <v-row>
    <v-col>
      <ProfileIntegration
        v-for="provider in integrationProviders"
        :key="provider.id"
        :provider-id="provider.id"
        :provider-name="provider.name"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import { AuthProviders } from '@/modules/auth/composables/useOpenAuthWindow';
import ProfileIntegration from './ProfileIntegration.vue';

const integrationProviders = [
  {
    id: AuthProviders.SPOTIFY,
    name: 'Spotify',
  },
  {
    id: AuthProviders.STRAVA,
    name: 'Strava',
  },
];

const ProfileIntegrations = defineComponent({
  name: 'ProfileIntegrations',
  components: {
    ProfileIntegration,
  },
  setup() {
    return {
      integrationProviders,
    };
  },
});

export default ProfileIntegrations;
</script>
