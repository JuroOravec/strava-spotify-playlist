<template>
  <v-card class="ProfileMenu" rounded="lg">
    <v-list color="transparent">
      <router-link
        v-for="section in menuSections"
        :key="'menu-' + section.sectionId"
        :to="section.to"
      >
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>
              {{ section.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import type { Location } from 'vue-router';

import { ProfileRoute } from '../types';

const menuSections: {
  sectionId: string;
  title: string;
  to: Location & { name: ProfileRoute };
}[] = [
  {
    sectionId: ProfileRoute.PREFERENCES,
    title: 'Preferences',
    to: { name: ProfileRoute.PREFERENCES },
  },
  {
    sectionId: ProfileRoute.INTEGRATIONS,
    title: 'Connected Apps',
    to: { name: ProfileRoute.INTEGRATIONS },
  },
  {
    sectionId: ProfileRoute.ACCOUNT,
    title: 'Manage My Account',
    to: { name: ProfileRoute.ACCOUNT },
  },
];

const ProfileMenu = defineComponent({
  name: 'ProfileMenu',
  setup: () => {
    return {
      menuSections,
    };
  },
});

export default ProfileMenu;
</script>

<style lang="scss">
.ProfileMenu {
  .v-list-item + .v-list-item {
    border-top: 1px solid lightgrey;
  }
}
</style>
>
