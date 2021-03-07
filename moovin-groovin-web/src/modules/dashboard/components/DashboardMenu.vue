<template>
  <div>
    <ListMenu :sections="sections" />
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
import find from 'lodash/find';
import merge from 'lodash/merge';

import useRefRich from '@/modules/utils-reactivity/composables/useRefRich';
import ListMenu from '@/modules/base/components/ListMenu.vue';
import type { ListMenuSection } from '@/modules/base/types';
import MembershipOfferDialog from '@/modules/profile/components/MembershipOfferDialog.vue';
import { DashboardRoute } from '../types';

const menuSections: ListMenuSection[] = [
  {
    groupId: 'dashboard',
    sectionId: 'dashboard',
    title: 'Playlists',
    to: { name: DashboardRoute.PLAYLISTS },
  },
  {
    groupId: 'dashboard',
    sectionId: 'analytics',
    title: 'Analytics',
    iconAppend: 'lock',
  },
];

const DashboardMenu = defineComponent({
  name: 'DashboardMenu',
  components: {
    MembershipOfferDialog,
    ListMenu,
  },
  setup: () => {
    const { ref: offerDialogIsOpen, setter: setOfferDialogIsOpen } = useRefRich({ value: false });

    const menuSectionListeners: Pick<ListMenuSection, 'groupId' | 'sectionId' | 'listeners'>[] = [
      {
        groupId: 'dashboard',
        sectionId: 'analytics',
        listeners: { click: () => setOfferDialogIsOpen(true) },
      },
    ];

    const enrichedMenuSections = menuSections.map((section) => {
      const sectionOverrides = find(menuSectionListeners, {
        sectionId: section.sectionId,
        groupId: section.groupId,
      });
      return merge({}, section, sectionOverrides ?? {});
    });

    return {
      sections: enrichedMenuSections,
      offerDialogIsOpen,
      setOfferDialogIsOpen,
    };
  },
});

export default DashboardMenu;
</script>

<style lang="scss">
.DashboardMenu {
}
</style>
>
