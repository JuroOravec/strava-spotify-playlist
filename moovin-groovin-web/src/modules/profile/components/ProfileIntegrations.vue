<template>
  <div>
    <v-row
      v-for="{ name, providers, integrated } in integrationGroups"
      :key="name"
      class="pb-5 pt-3"
    >
      <v-col>
        <v-row>
          <v-col>
            <h3 class="text-h5 font-weight-bold">
              {{ name }}
            </h3>
          </v-col>
        </v-row>
        <v-row v-if="!integrated">
          <v-col class="pb-0">
            <v-icon color="amber">warning</v-icon>
            <span class="body-2 pl-2 font-weight-bold">At least one integration is required</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            class="ProfileIntegrations__items"
            :class="$vuetify.breakpoint.mdAndUp ? 'ProfileIntegrations__items--md' : ''"
          >
            <ProfileIntegration
              v-for="provider in providers"
              :key="provider.providerId"
              class="ProfileIntegrations__item"
              :provider-id="provider.providerId"
              :provider-name="provider.name"
              :integrated="isProviderIntegrated(provider)"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, unref } from '@vue/composition-api';

import useCurrentUser from '@/modules/auth/composables/useCurrentUser';
import ProfileIntegration from './ProfileIntegration.vue';
import useProviders, { Provider } from '@/modules/auth/composables/useProviders';

const ProfileIntegrations = defineComponent({
  name: 'ProfileIntegrations',
  components: {
    ProfileIntegration,
  },
  setup() {
    const { user } = useCurrentUser();
    const { providersByType } = useProviders();

    const isProviderIntegrated = (provider: Provider) =>
      Boolean(unref(user)?.providers.find((p) => p.providerId === provider.providerId));

    const integrationGroups = computed(() => [
      {
        name: 'Music',
        providers: unref(providersByType).playlist ?? [],
        integrated: unref(providersByType).playlist?.some(isProviderIntegrated),
      },
      {
        name: 'Sport',
        providers: unref(providersByType).activity ?? [],
        integrated: unref(providersByType).activity?.some(isProviderIntegrated),
      },
    ]);

    return {
      integrationGroups,
      isProviderIntegrated,
    };
  },
});

export default ProfileIntegrations;
</script>

<style lang="scss">
.ProfileIntegrations {
  &__items {
    display: flex;
    flex-wrap: wrap;
  }

  &__item {
    flex: 1 1 100%;
    margin: 3 * $spacer;
  }

  --md {
    &__items {
      margin-left: -3 * $spacer;
      margin-right: -3 * $spacer;
    }

    &__item {
      flex: 0 1 270px;
    }
  }
}
</style>
