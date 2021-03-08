<template>
  <NewsArticle date="2021-02-24">
    <template slot="title"> MoovinGroovin alpha release </template>

    <p>MoovinGroovin is now open to public!</p>
    <p>
      Sure, there isn't much yet. But that also means there's plenty of room for opportunities and
      crazy ideas and ice cream. And we love them all!
    </p>
    <p>
      What there is, though, is a profile settings page. This is where you can add your Spotify and
      Strava accounts, and where you can modify how the playlist and activity are formatted. Or, if
      you want to be forgotten, where you can delete your profile. Be sure to click on the info
      icons to get further details.
    </p>
    <p class="py-4">
      <LightboxImg
        :src="require('../assets/Article-2021-02-24-1200-demo.gif')"
        alt="Alpha release demo"
        :max-width="600"
      />
    </p>
    <p>
      The app is built for the users. So if you, dear user, find that something is missing, broken,
      or you want to change something, hit me up at <a :href="`mailto:${email}`">{{ email }}</a
      >, or find me via the links in the footer.
    </p>
    <p>Wishing you lots of dreamy music and mesmerizing adventures!</p>
    <p>- Juro</p>
  </NewsArticle>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import NewsArticle from '../NewsArticle.vue';
import LightboxImg from '@/modules/utils/components/LightboxImg.vue';

const Article = defineComponent({
  /* eslint-disable-next-line */
  name: 'Article-2021-02-24-1200-Alpha-Release',
  components: {
    NewsArticle,
    LightboxImg,
  },
  setup() {
    const email = 'juro@moovingroovin.com';
    return { email };
  },
});

export default Article;
</script>
