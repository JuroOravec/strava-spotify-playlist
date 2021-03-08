<template>
  <NewsArticle date="2021-03-08">
    <template slot="title"> Big news: More music streaming services incoming! </template>

    <p>
      Not using Spotify? Maybe you have Apple Music, Amazon Music, Google Play Music, Deezer,
      Soundcloud or other music streaming service? In the upcoming weeks, this will no longer be an
      issues.
    </p>
    <p>
      This is big news. You see, MoovinGroovin was written with single purpose - to make Spotify
      playlists from songs played on Spotify during an activity on Strava. Everything in the app was
      based on this assumption. Rewriting MoovinGroovin to support more music streaming services
      meant changing large portion of what makes the app tick.
    </p>
    <p>This started as a request from an Apple Music user.</p>
    <p>Which services would you like to see next?</p>
  </NewsArticle>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import NewsArticle from '../NewsArticle.vue';

const Article = defineComponent({
  /* eslint-disable-next-line */
  name: 'Article-2021-03-08-2100-Integrations-Incoming',
  components: {
    NewsArticle,
  },
});

export default Article;
</script>
