<template>
  <!-- See https://www.npmjs.com/package/v-img -->
  <v-img v-img="{ src }" :src="src" v-bind="$attrs" class="LightboxImg" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

const LightboxImg = defineComponent({
  name: 'LightboxImg',
  inheritAttrs: false,
  props: {
    src: { type: String, required: true },
  },
});

export default LightboxImg;
</script>

<style lang="scss">
.LightboxImg {
  margin-left: auto;
  margin-right: auto;
}
.content-v-img img {
  width: 80% !important;
}
</style>
