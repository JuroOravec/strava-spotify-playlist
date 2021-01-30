<template>
  <v-app-bar class="Navbar" app color="primary" dark flat>
    <v-container class="py-0 fill-height">
      <v-row class="fill-height" justify="space-between" align="center">
        <v-col cols="auto" class="Navbar__title fill-height">
          <router-link to="/" class="fill-height">
            <v-app-bar-title class="title fill-height d-flex align-center">
              MoovinGroovin
            </v-app-bar-title>
          </router-link>
        </v-col>

        <v-spacer></v-spacer>

        <v-col cols="auto" class="Navbar__nav fill-height">
          <router-link
            v-for="link in navbarLinks"
            :key="'navbar-item-' + link.to.name"
            class="Navbar__nav-item fill-height"
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
import { defineComponent } from '@vue/composition-api';
import type { Location } from 'vue-router';

import LoginMenu from '@/modules/auth/components/LoginMenu.vue';
import { BaseRoute } from '@/modules/base/types';
import { RootRoute } from '@/modules/install/types';

const navbarLinks: {
  title: string;
  to: Location;
}[] = [
  {
    title: 'Profile',
    to: { name: RootRoute.PROFILE },
  },
  {
    title: 'About',
    to: { name: BaseRoute.ABOUT },
  },
];

const Navbar = defineComponent({
  name: 'Navbar',
  components: {
    LoginMenu,
  },
  setup() {
    return {
      navbarLinks,
    };
  },
});

export default Navbar;
</script>

<style lang="scss">
@import '@/plugins/vuetify/vuetify';
.Navbar {
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
}
</style>
