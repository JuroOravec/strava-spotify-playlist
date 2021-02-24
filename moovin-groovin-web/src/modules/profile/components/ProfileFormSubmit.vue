<template>
  <v-row class="ProfileFormSave" justify="space-around" justify-sm="start">
    <v-col cols="auto" :class="{ 'px-2': $vuetify.breakpoint.smAndDown }">
      <v-btn color="primary" v-bind="submitBtnAttrs" @click="$emit('submit')">
        <v-progress-circular
          v-if="submitIsLoading"
          class="mr-2"
          indeterminate
          :size="24"
          color="primary"
        />
        <slot name="action"> Save changes </slot>
      </v-btn>
    </v-col>
    <v-col cols="auto" :class="{ 'px-2': $vuetify.breakpoint.smAndDown }">
      <v-btn color="primary" outlined v-bind="discardBtnAttrs" @click="$emit('discard')">
        <v-progress-circular
          v-if="discardIsLoading"
          class="mr-2"
          indeterminate
          :size="24"
          color="primary"
        />
        <slot name="action">Discard changes </slot>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance } from '@vue/composition-api';

import pickPrefixed from '@/modules/utils/utils/pickPrefixed';

const ProfileFormSubmit = defineComponent({
  name: 'ProfileFormSubmit',
  inheritAttrs: false,
  props: {
    submitIsLoading: { type: Boolean, required: false, default: false },
    discardIsLoading: { type: Boolean, required: false, default: false },
  },
  setup() {
    const instance = getCurrentInstance();

    const submitBtnAttrs = computed(() => pickPrefixed(instance?.proxy.$attrs ?? {}, 'submit-'));
    const discardBtnAttrs = computed(() => pickPrefixed(instance?.proxy.$attrs ?? {}, 'discard-'));

    return {
      submitBtnAttrs,
      discardBtnAttrs,
    };
  },
});

export default ProfileFormSubmit;
</script>

<style lang="scss">
.ProfileFormSave {
}
</style>
