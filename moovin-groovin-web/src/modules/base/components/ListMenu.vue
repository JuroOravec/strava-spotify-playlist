<template>
  <div class="ListMenu">
    <v-card
      v-for="[groupId, menuSectionGroup] in menuSectionGroups"
      :key="groupId"
      class="ListMenu__group"
    >
      <v-navigation-drawer floating permanent>
        <v-list color="transparent" class="py-0">
          <v-list-item
            v-for="section in menuSectionGroup"
            :key="'menu-' + section.sectionId"
            link
            :to="section.to"
            class="ListMenu__item"
            :class="{ 'px-3': $vuetify.breakpoint.smAndDown }"
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
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, PropType, unref } from '@vue/composition-api';
import groupBy from 'lodash/groupBy';

import type { ListMenuSection } from '../types';

const ListMenu = defineComponent({
  name: 'ListMenu',
  props: {
    sections: {
      type: Array as PropType<ListMenuSection[]>,
      required: false,
      default: () => [],
    },
  },
  setup: (props) => {
    const { sections } = toRefs(props);

    const menuSectionGroups = Object.entries(
      groupBy(unref(sections), (section) => section.groupId)
    );

    return {
      menuSectionGroups,
    };
  },
});

export default ListMenu;
</script>

<style lang="scss">
.ListMenu {
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
  .v-navigation-drawer {
    width: 100% !important;
  }
}
</style>
>
