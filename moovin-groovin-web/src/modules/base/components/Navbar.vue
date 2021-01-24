<template>
  <v-app-bar class="Navbar" app color="primary" dark flat>
    <v-container class="py-0 fill-height">
      <v-row justify="space-between">
        <v-col cols="auto">
          <span class="title"> MoovinGroovin </span>
        </v-col>

        <v-spacer></v-spacer>

        <v-col cols="auto">
          <router-link
            v-for="link in navbarLinks"
            :key="'navbar-item-' + link.to.name"
            :to="link.to"
          >
            <v-btn text>
              {{ link.title }}
            </v-btn>
          </router-link>
        </v-col>

        <!-- <v-spacer></v-spacer> -->

        <v-col cols="auto">
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
.Navbar {
}
</style>
