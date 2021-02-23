<template>
  <div class="ProfileMenu">
    <v-card
      v-for="[groupId, menuSectionGroup] in menuSectionGroups"
      :key="groupId"
      class="ProfileMenu__group"
    >
      <v-navigation-drawer floating permanent>
        <v-list color="transparent" class="py-0">
          <v-list-item
            v-for="section in menuSectionGroup"
            :key="'menu-' + section.sectionId"
            link
            :to="section.to"
            class="ProfileMenu__item"
            v-on="section.listeners"
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ section.title }}
              </v-list-item-title>
              <v-icon v-if="section.iconAppend" small class="flex"
                >{{ section.iconAppend }}
              </v-icon>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
    <MembershipOfferDialog
      :value="offerDialogIsOpen"
      @cancel="setOfferDialogIsOpen(false)"
      @confirm="setOfferDialogIsOpen(false)"
    >
      <template #activator>
        <div />
      </template>
    </MembershipOfferDialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import type { Location } from 'vue-router';
import find from 'lodash/find';
import groupBy from 'lodash/groupBy';

import useRefRich from '@/modules/utils-reactivity/composables/useRefRich';
import { ProfileRoute } from '../types';
import MembershipOfferDialog from './MembershipOfferDialog.vue';

type MenuSectionGroups = 'dashboard' | 'settings';

interface MenuSection {
  groupId: MenuSectionGroups;
  sectionId: string;
  title: string;
  to?: Location & { name: ProfileRoute };
  listeners?: Record<string, (...args: any[]) => void>;
  iconAppend?: string;
}

const menuSections: MenuSection[] = [
  {
    groupId: 'dashboard',
    sectionId: 'dashboard',
    title: 'Dashboard',
    listeners: { click: console.log },
    iconAppend: 'lock',
  },
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
    MembershipOfferDialog,
  },
  setup: () => {
    const { ref: offerDialogIsOpen, setter: setOfferDialogIsOpen } = useRefRich({ value: false });

    const menuSectionListeners: Pick<MenuSection, 'groupId' | 'sectionId' | 'listeners'>[] = [
      {
        groupId: 'dashboard',
        sectionId: 'dashboard',
        listeners: { click: () => setOfferDialogIsOpen(true) },
      },
    ];

    const menuSectionGroups = Object.entries(
      groupBy(
        menuSections.map((section) => ({
          ...section,
          ...find(menuSectionListeners, { sectionId: section.sectionId, groupId: section.groupId }),
        })),
        (section) => section.groupId
      )
    );

    return {
      menuSectionGroups,
      offerDialogIsOpen,
      setOfferDialogIsOpen,
    };
  },
});

export default ProfileMenu;
</script>

<style lang="scss">
.ProfileMenu {
  &__group {
    & + & {
      margin-top: 7 * $spacer;
    }
  }
  &__item {
    .v-list-item__title,
    .v-icon {
      flex: 0 1 auto;
    }
    .v-list-item__content {
      justify-content: space-between;
    }
  }
  .v-list-item + .v-list-item {
    border-top: 1px solid lightgrey;
  }
}
</style>
>
