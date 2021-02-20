<template>
  <v-app-bar class="Appbar" app color="primary" dark flat>
    <v-container class="py-0 fill-height">
      <v-row class="fill-height" justify="space-between" align="center">
        <v-col cols="auto" class="Appbar__title fill-height">
          <router-link to="/" class="fill-height">
            <v-app-bar-title class="title fill-height d-flex align-center">
              MoovinGroovin
            </v-app-bar-title>
          </router-link>
        </v-col>

        <v-spacer></v-spacer>

        <v-col cols="auto" class="Appbar__nav fill-height">
          <router-link
            v-for="link in links"
            :key="'appbar-item-' + link.to.name"
            class="Appbar__nav-item fill-height"
            :to="link.to"
          >
            <v-btn text class="fill-height">
              {{ link.title }}
            </v-btn>
          </router-link>
        </v-col>

        <v-col cols="auto" class="fill-height">
          <LoginMenu />
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts">
import { computed, defineComponent, unref } from '@vue/composition-api';
import type { Location } from 'vue-router';

import LoginMenu from '@/modules/auth/components/LoginMenu.vue';
import { ProfileRoute } from '@/modules/profile/types';
import useCurrentUser from '@/modules/auth/composables/useCurrentUser';

const appbarLinks: {
  title: string;
  to: Location;
  requireAuth: boolean;
}[] = [
  {
    title: 'Profile',
    to: { name: ProfileRoute.ROOT },
    requireAuth: true,
  },
];

const Appbar = defineComponent({
  name: 'Appbar',
  components: {
    LoginMenu,
  },
  setup() {
    const { isLoggedIn } = useCurrentUser();

    const links = computed(() =>
      appbarLinks.filter((link) => !link.requireAuth || unref(isLoggedIn))
    );

    return {
      links,
    };
  },
});

export default Appbar;
</script>

<style lang="scss">
@import '~vuetify/src/styles/main';
.Appbar {
  &__nav {
    &-item {
      display: flex;
      flex-direction: column;

      .v-btn {
        height: unset !important;
        flex: 1 1 auto;
      }
    }
  }

  .title {
    color: white;
  }
  .col {
    @extend .py-0;
    display: flex;
    align-items: center;
  }

  .v-toolbar__content {
    @extend .py-0;
  }

  .v-app-bar-title__content {
    text-overflow: unset;
  }
}
</style>
