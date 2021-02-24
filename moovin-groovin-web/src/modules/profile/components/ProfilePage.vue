<template>
  <v-row>
    <v-col class="col-sm-4 col-md-3">
      <ProfileMenu />
    </v-col>

    <v-col>
      <router-view />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import ProfileMenu from './ProfileMenu.vue';

const ProfilePage = defineComponent({
  name: 'ProfilePage',
  components: {
    ProfileMenu,
  },
});

export default ProfilePage;
</script>
