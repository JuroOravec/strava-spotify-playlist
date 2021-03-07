<template>
  <v-img :height="size" :width="size" :src="iconSrc" class="ProviderIcon" />
</template>

<script lang="ts">
import { computed, defineComponent, toRefs, unref } from '@vue/composition-api';

// @ts-expect-error Vetur doesn't support importing static files
import stravaIconPath from '../assets/strava-icon-black.svg';
// @ts-expect-error Vetur doesn't support importing static files
import spotifyIconPath from '../assets/spotify-icon-black.png';

const providerToIconFile: Record<string, string> = {
  strava: stravaIconPath,
  spotify: spotifyIconPath,
};

const ProviderIcon = defineComponent({
  name: 'ProviderIcon',
  props: {
    provider: { type: String, required: true },
    size: { type: Number, required: false, default: 24 },
  },
  setup(props) {
    const { provider } = toRefs(props);

    const iconSrc = computed((): string => providerToIconFile[unref(provider)] ?? '');

    return {
      iconSrc,
    };
  },
});

export default ProviderIcon;
</script>

<style lang="scss">
.ProviderIcon {
  transition: opacity 0.15s ease-in-out;

  &:hover {
    opacity: 0.7;
  }
}
</style>
