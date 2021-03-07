<template>
  <ProfileCard>
    <template slot="title">
      {{ providerName }}
    </template>

    <template slot="title-append">
      <v-spacer />
      <v-col cols="auto">
        <v-icon v-if="integrated" color="green darken-2">check_circle</v-icon>
        <div v-else>
          <v-icon color="blue-grey lighten-2">highlight_off</v-icon>
        </div>
      </v-col>
    </template>

    <template v-if="integrated">
      <v-col cols="auto">
        <v-btn color="primary" outlined @click="authWindowHandler(providerId)">
          <slot name="action"> Change </slot>
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn color="red lighten-2" dark outlined @click="deleteIntegration(providerId)">
          <slot name="action">Remove </slot>
        </v-btn>
      </v-col>
    </template>
    <v-col v-else>
      <v-btn color="primary" @click="authWindowHandler(providerId)">
        <slot name="action"> Connect </slot>
      </v-btn>
    </v-col>
  </ProfileCard>
</template>

<script lang="ts">
import { defineComponent, PropType, unref } from '@vue/composition-api';
import difference from 'lodash/difference';

import useOpenAuthWindow, { AuthProvider } from '@/modules/auth/composables/useOpenAuthWindow';
import useCurrentUser from '@/modules/auth/composables/useCurrentUser';
import ProfileCard from './ProfileCard.vue';
import useNotifSnackbar, { NotifType } from '@/modules/utils/composables/useNotifSnackbar';

const ProfileIntegration = defineComponent({
  name: 'ProfileIntegration',
  components: {
    ProfileCard,
  },
  props: {
    providerName: { type: String, required: true },
    providerId: { type: String as PropType<AuthProvider>, required: true },
    integrated: { type: Boolean, required: false, default: false },
  },
  setup() {
    const { user, deleteIntegrations, refetch: refetchUser } = useCurrentUser();
    const { openAuthWindow } = useOpenAuthWindow();
    const { queueNotif } = useNotifSnackbar();

    const deleteIntegration = (providerId: string) =>
      deleteIntegrations({ providerIds: [providerId] });

    const authWindowHandler = (providerId: AuthProvider) => {
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

    return {
      authWindowHandler,
      deleteIntegration,
    };
  },
});

export default ProfileIntegration;
</script>

<style lang="scss">
.ProfileIntegration {
}
</style>
