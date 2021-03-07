<template>
  <div class="DashboardPlaylists__items">
    <DashboardPlaylist
      v-for="playlist in playlists"
      :key="`${playlist.playlistProviderId}__${playlist.playlistId}`"
      :playlist="playlist"
      class="DashboardPlaylists__item"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import usePlaylists from '../composables/usePlaylists';
import DashboardPlaylist from './DashboardPlaylist.vue';

const DashboardPlaylists = defineComponent({
  name: 'DashboardPlaylists',
  components: {
    DashboardPlaylist,
  },
  setup() {
    const { playlists } = usePlaylists();

    return {
      playlists,
    };
  },
});

export default DashboardPlaylists;
</script>

<style lang="scss">
.DashboardPlaylists {
  &__items {
    display: flex;
    flex-wrap: wrap;
    min-width: 300px;
    margin-left: -3 * $spacer;
    margin-right: -3 * $spacer;
  }

  &__item {
    flex: 1 0 300px;
    margin: 3 * $spacer;
  }
}
</style>
