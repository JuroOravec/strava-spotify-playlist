<template>
  <NewsArticle date="2021-03-14">
    <template slot="title"> Apple Music integration currently not possible </template>

    <p>
      In the past week I had a look at integrating MoovinGroovin with Apple Music. Unfortunately,
      it's not possible.
    </p>
    <p>There were 3 issues, but can't do anything about 2 of them:</p>
    <ol>
      <li>
        Main one is that Apple Music doesn't provide a way to get info on the songs you've listened
        to over a certain period. it gives you info on played albums, playlists and stations, but
        tells you nothing about the songs. This is a dealbreaker for MoovinGroovin, because you
        cannot create new playlists from these. Secondly, Apple Music doesn't say
        <i>when</i> something was played.
      </li>
      <li>
        Secondly, Apple Music doesn't say <i>when</i> something was played. This is not a
        dealbreaker, but you could not see when or where a certain song was played.
      </li>
      <li>
        <p>
          Last issue was with integrating with Apple Music. Apple Music wants to allow you to access
          info on recently played songs only while you're browsing a website that needs that info.
          Once you close the browser, the access ends. I hope you see this is not very friendly for
          an app that wants you to get active outdoors!
        </p>
        <p>
          Good news here, though, is that this last issues could be worked around, and the open
          source community has one more tool in its belt!
        </p>
      </li>
      <p>- Juro</p>
    </ol>
  </NewsArticle>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import NewsArticle from '../NewsArticle.vue';

const Article = defineComponent({
  /* eslint-disable-next-line */
  name: 'Article-2021-03-14-1730-Apple-Music-integration-currently-not-possible',
  components: {
    NewsArticle,
  },
});

export default Article;
</script>
