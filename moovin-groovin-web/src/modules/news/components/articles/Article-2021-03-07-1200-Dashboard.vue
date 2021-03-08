<template>
  <NewsArticle date="2021-03-07">
    <template slot="title"> Dashboard - See all your playlists </template>

    <p>
      MoovinGroovin was working well, but it was working in the shadows. You didn't know if a
      playlist was created, if it was in the process of creation, or if something went wrong. And if
      you wanted to find an easy way find old playlists? Difficult!
    </p>
    <p>That's why MoovinGroovin gets a dashboard of all your playlists.</p>
    <p>
      Playlists in the dashboard give you easy access to both the playlist and the activity, so you
      can always find what you're looking for.
    </p>
    <p>You will find playlists in the "Playlists" tab.</p>
    <p class="py-4">
      <LightboxImg
        :src="require('../assets/Article-2021-03-07-2100-dashboard.gif')"
        alt="Dashboard demo"
        :max-width="600"
      />
    </p>
  </NewsArticle>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import NewsArticle from '../NewsArticle.vue';
import LightboxImg from '@/modules/utils/components/LightboxImg.vue';

const Article = defineComponent({
  /* eslint-disable-next-line */
  name: 'Article-2021-03-07-2100-Dashboard',
  components: {
    NewsArticle,
    LightboxImg,
  },
});

export default Article;
</script>
