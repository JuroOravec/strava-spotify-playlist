<template>
  <v-row>
    <v-col>
      <ProfileIntegration
        v-for="integration in integrations"
        :key="integration.id"
        class="ProfileIntegrations__item"
        :provider-id="integration.id"
        :provider-name="integration.name"
        :integrated="integration.integrated"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { computed, defineComponent, unref } from '@vue/composition-api';

import { AuthProviders } from '@/modules/auth/composables/useOpenAuthWindow';
import useCurrentUser from '@/modules/auth/composables/useCurrentUser';
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
    const { user } = useCurrentUser();

    const integrations = computed(() => {
      return integrationProviders.map((provider) => ({
        ...provider,
        integrated: unref(user)?.providers.includes(provider.id) ?? false,
      }));
    });

    return {
      integrations,
    };
  },
});

export default ProfileIntegrations;
</script>

<style lang="scss">
@import '@/plugins/vuetify/vuetify';
.ProfileIntegrations {
  &__item {
    & + & {
      @extend .mt-8;
    }
  }
}
</style>
