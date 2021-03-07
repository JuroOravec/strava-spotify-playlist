<template>
  <ListMenu :sections="sections" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import ListMenu from '@/modules/base/components/ListMenu.vue';
import type { ListMenuSection } from '@/modules/base/types';
import { ProfileRoute } from '../types';

const menuSections: (ListMenuSection & { to: { name: ProfileRoute } })[] = [
  {
    groupId: 'settings',
    sectionId: ProfileRoute.PREFERENCES,
    title: 'Preferences',
    to: { name: ProfileRoute.PREFERENCES },
  },
  {
    groupId: 'settings',
    sectionId: ProfileRoute.INTEGRATIONS,
    title: 'Connected Apps',
    to: { name: ProfileRoute.INTEGRATIONS },
  },
  {
    groupId: 'settings',
    sectionId: ProfileRoute.ACCOUNT,
    title: 'Manage My Account',
    to: { name: ProfileRoute.ACCOUNT },
  },
];

const ProfileMenu = defineComponent({
  name: 'ProfileMenu',
  components: {
    ListMenu,
  },
  setup: () => {
    return {
      sections: menuSections,
    };
  },
});

export default ProfileMenu;
</script>

<style lang="scss">
.ProfileMenu {
}
</style>
>
