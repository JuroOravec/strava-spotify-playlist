<template>
  <div class="ProfileFormCheckbox">
    <v-checkbox v-bind="$attrs" :persistent-hint="true" v-on="$listeners">
      <template #label>
        <div class="ProfileFormCheckbox__label">
          <slot name="label" />
        </div>
      </template>
    </v-checkbox>
    <p class="ProfileFormCheckbox__label-detail">
      <slot name="label-detail" />
    </p>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

const ProfileFormCheckbox = defineComponent({
  name: 'ProfileFormCheckbox',
  inheritAttrs: false,
});

export default ProfileFormCheckbox;
</script>

<style lang="scss">
@import '~vuetify/src/styles/main';
.ProfileFormCheckbox {
  &__label {
    @extend .text-body-1;
    color: black;
  }

  &__label-detail {
    @extend .text-caption, .mb-0, .pl-8;
  }

  .v-messages {
    display: none;
  }

  .v-input__slot {
    margin: 0;
    align-items: start;
  }

  .v-input--checkbox .v-label {
    user-select: text;
  }
}
</style>
