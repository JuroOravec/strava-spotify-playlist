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
          <span class="body-2 pr-2">This integration is required</span>
          <v-icon color="amber">warning</v-icon>
        </div>
      </v-col>
    </template>

    <template v-if="integrated">
      <v-col cols="auto">
        <v-btn color="primary" outlined @click="openAuthWindow(providerId)">
          <slot name="action"> Change account </slot>
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn color="red lighten-2" dark outlined @click="deleteIntegration(providerId)">
          <slot name="action">Remove </slot>
        </v-btn>
      </v-col>
    </template>
    <v-col v-else>
      <v-btn color="primary" @click="openAuthWindow(providerId)">
        <slot name="action"> Connect account </slot>
      </v-btn>
    </v-col>
  </ProfileCard>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';

import useOpenAuthWindow, { AuthProviders } from '@/modules/auth/composables/useOpenAuthWindow';
import useCurrentUser from '@/modules/auth/composables/useCurrentUser';
import ProfileCard from './ProfileCard.vue';

const ProfileIntegration = defineComponent({
  name: 'ProfileIntegration',
  components: {
    ProfileCard,
  },
  props: {
    providerName: { type: String, required: true },
    providerId: { type: String as PropType<AuthProviders>, required: true },
    integrated: { type: Boolean, required: false, default: false },
  },
  setup() {
    const { deleteIntegrations } = useCurrentUser();
    const { openAuthWindow } = useOpenAuthWindow();

    const deleteIntegration = (providerId: string) =>
      deleteIntegrations({ providerIds: [providerId] });

    return {
      openAuthWindow,
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
