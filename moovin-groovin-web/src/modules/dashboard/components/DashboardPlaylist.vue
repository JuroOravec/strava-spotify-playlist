<template>
  <DashboardCard class="DashboardPlaylist">
    <template slot="title">
      {{ playlistTitle }}
    </template>

    <template slot="subtitle">
      <span v-if="playlist.activityName">
        from
        <a :href="playlist.activityUrl" target="_blank" rel="noopener">
          <b>{{ playlist.activityName }}</b>
        </a>
      </span>
    </template>

    <v-row justify="space-between">
      <v-col class="col-auto pb-0">
        <span class="text-caption">
          {{ playlistDate }}
        </span>
      </v-col>
      <v-col class="col-auto pb-0 d-flex">
        <span class="text-caption pr-2">Links: </span>
        <a
          :href="playlist.playlistUrl"
          target="_blank"
          rel="noopener"
          class="DashboardPlaylist__provider"
        >
          <ProviderIcon :provider="playlist.playlistProviderId" />
        </a>
        <a
          :href="playlist.activityUrl"
          target="_blank"
          rel="noopener"
          class="DashboardPlaylist__provider"
        >
          <ProviderIcon :provider="playlist.activityProviderId" />
        </a>
      </v-col>
    </v-row>
  </DashboardCard>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs, unref, PropType } from '@vue/composition-api';
import isNil from 'lodash/isNil';

import unixTimestampToDate from '@moovin-groovin/shared/src/utils/unixTimestampToDate';
import ProviderIcon from '@/modules/utils/components/ProviderIcon.vue';
import DashboardCard from './DashboardCard.vue';
import type { Playlist } from '../composables/usePlaylists';

const DashboardPlaylist = defineComponent({
  name: 'DashboardPlaylist',
  components: {
    DashboardCard,
    ProviderIcon,
  },
  props: {
    playlist: { type: Object as PropType<Playlist>, required: true },
  },
  setup(props) {
    const { playlist } = toRefs(props);

    const playlistTitle = computed((): string => {
      const { playlistName, activityName } = unref(playlist) ?? {};
      if (playlistName) return playlistName;
      if (activityName) return `Playlist for activity "${activityName}"`;
      return 'Unknown playlist';
    });

    const playlistDate = computed((): string => {
      const { dateCreated } = unref(playlist) ?? {};

      if (isNil(dateCreated)) return '';

      return unixTimestampToDate(dateCreated).toLocaleDateString();
    });

    return {
      playlistTitle,
      playlistDate,
    };
  },
});

export default DashboardPlaylist;
</script>

<style lang="scss">
.DashboardPlaylist {
  &__provider {
    & + & {
      padding-left: 1 * $spacer;
    }
  }
}
</style>
