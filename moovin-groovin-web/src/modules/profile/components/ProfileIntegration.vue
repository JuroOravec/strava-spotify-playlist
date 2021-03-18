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
        <v-btn color="primary" outlined @click="$emit('change')">
          <slot name="action"> Change </slot>
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn color="red lighten-2" dark outlined @click="$emit('remove')">
          <slot name="action">Remove </slot>
        </v-btn>
      </v-col>
    </template>
    <v-col v-else>
      <v-btn color="primary" @click="$emit('add')">
        <slot name="action"> Connect </slot>
      </v-btn>
    </v-col>
  </ProfileCard>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import ProfileCard from './ProfileCard.vue';

const ProfileIntegration = defineComponent({
  name: 'ProfileIntegration',
  components: {
    ProfileCard,
  },
  props: {
    providerName: { type: String, required: true },
    integrated: { type: Boolean, required: false, default: false },
  },
});

export default ProfileIntegration;
</script>

<style lang="scss">
.ProfileIntegration {
}
</style>
