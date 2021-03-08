<template>
  <article class="NewsArticle">
    <h3 class="text-h5 py-4 font-weight-bold">
      <slot name="title" />
    </h3>
    <p class="text-caption py-0">{{ formattedDate }}</p>
    <slot name="default" />
  </article>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs, unref, PropType } from '@vue/composition-api';

const NewsArticle = defineComponent({
  name: 'NewsArticle',
  props: {
    date: { type: [Object, String] as PropType<Date | string>, required: false, default: null },
  },
  setup(props) {
    const { date } = toRefs(props);

    const formattedDate = computed(
      (): string => (unref(date) && new Date(unref(date))?.toLocaleDateString()) ?? ''
    );

    return {
      formattedDate,
    };
  },
});

export default NewsArticle;
</script>

<style lang="scss">
.NewsArticle {
  li {
    padding-bottom: $spacer * 2;

    &::marker {
      padding-right: $spacer;
    }
  }
}
</style>
>
