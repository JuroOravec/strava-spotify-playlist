<template>
  <router-view v-bind="$attrs" v-on="$listeners" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

/**
 * Empty component rendered at namespace route.
 *
 * Namespace route is a route that exists only to namespace child routes. */
const RoutePassthrough = defineComponent({
  name: 'RoutePassthrough',
  inheritAttrs: false,
});

export default RoutePassthrough;
</script>
