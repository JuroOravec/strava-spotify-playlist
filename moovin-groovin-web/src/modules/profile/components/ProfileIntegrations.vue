<template>
  <div class="ProfileIntegrations">
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
              :provider-name="provider.name"
              :integrated="isProviderIntegrated(provider)"
              @add="onIntegrationChange(provider.providerId)"
              @change="onIntegrationChange(provider.providerId)"
              @remove="deleteIntegration(provider.providerId)"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, unref } from '@vue/composition-api';
import difference from 'lodash/difference';

import useCurrentUser from '@/modules/auth/composables/useCurrentUser';
import useOpenAuthWindow from '@/modules/auth/composables/useOpenAuthWindow';
import useProviders, { Provider } from '@/modules/auth/composables/useProviders';
import useNotifSnackbar, { NotifType } from '@/modules/utils/composables/useNotifSnackbar';
import ProfileIntegration from './ProfileIntegration.vue';

const ProfileIntegrations = defineComponent({
  name: 'ProfileIntegrations',
  components: {
    ProfileIntegration,
  },
  setup() {
    const { user, deleteIntegrations, refetch: refetchUser } = useCurrentUser();
    const { openAuthWindow } = useOpenAuthWindow();
    const { queueNotif } = useNotifSnackbar();
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

    const deleteIntegration = (providerId: string) =>
      deleteIntegrations({ providerIds: [providerId] });

    const authWindowHandler = (providerId: string) => {
      const oldProviders = [...(unref(user)?.providers ?? [])];

      const onDidCloseWindow = () =>
        refetchUser()
          .then(() => {
            const newProviders = [...(unref(user)?.providers ?? [])];
            if (!newProviders.find((provider) => provider.providerId === providerId)) {
              queueNotif({
                notifType: NotifType.ERROR,
                attrs: {
                  content: 'Failed to add integration',
                },
              });
              return;
            }

            if (difference(newProviders, oldProviders).length) {
              queueNotif({
                notifType: NotifType.CONFIRM,
                attrs: {
                  content: 'Integration added successfully.',
                },
              });
            }
          })
          .catch((err) =>
            queueNotif({
              notifType: NotifType.ERROR,
              attrs: {
                content: `Failed to add integration: ${err.message}`,
              },
            })
          );

      return openAuthWindow(providerId, { onDidCloseWindow });
    };

    const onIntegrationChange = (providerId: string) => {
      authWindowHandler(providerId);
    };

    return {
      deleteIntegration,
      onIntegrationChange,
      integrationGroups,
      isProviderIntegrated,
    };
  },
});

export default ProfileIntegrations;
</script>

<style lang="scss">
.ProfileIntegrations {
  min-width: 350px;
  &__items {
    display: flex;
    flex-wrap: wrap;
  }

  &__item {
    flex: 1 0 250px;
    margin: 3 * $spacer;

    & + & {
      margin-top: 3 * $spacer;
    }
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
