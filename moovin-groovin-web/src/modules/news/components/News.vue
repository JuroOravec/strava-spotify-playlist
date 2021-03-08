<template>
  <div class="News">
    <h1 class="text-h4 pt-10 pb-6 font-weight-bold">News</h1>

    <template :is="article" v-for="(article, index) in articles">
      <component :is="article" :key="article.name" />
      <v-divider v-if="!isIndexLast(index)" :key="`${article.name}-divider`" class="my-6" />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import articles from './articles';

const News = defineComponent({
  name: 'News',
  setup() {
    const isIndexLast = (index: number): boolean => index === articles.length - 1;

    return {
      articles,
      isIndexLast,
    };
  },
});

export default News;
</script>

<style lang="scss">
.News {
}
</style>
