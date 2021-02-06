<template>
  <ProfileCheckbox
    class="ProfileFormTextarea"
    :class="{ 'ProfileFormTextarea--no-checkbox': !checkbox }"
  >
    <template #label>
      <slot name="label" />
    </template>
    <template #label-detail>
      <slot name="label-detail" />
    </template>
    <v-textarea
      rows="3"
      auto-grow
      filled
      counter
      clearable
      persistent-hint
      :validate-on-blur="true"
      clear-icon="mdi-close-circle"
      class="ProfileFormTextarea__textarea"
    />
  </ProfileCheckbox>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import ProfileCheckbox from './ProfileFormCheckbox.vue';

const ProfileFormTextarea = defineComponent({
  name: 'ProfileFormTextarea',
  components: {
    ProfileCheckbox,
  },
  props: {
    checkbox: { type: Boolean, default: false },
  },
});

export default ProfileFormTextarea;
</script>

<style lang="scss">
@import '~@/plugins/vuetify/vuetify';
.ProfileFormTextarea {
  &__textarea {
    @extend .pl-8;
  }

  .v-text-field__details {
    @extend .pt-2;
    margin-bottom: 0 !important;
    flex-direction: row-reverse;
  }

  &--no-checkbox {
    .ProfileFormTextarea__textarea {
      padding: 0 !important;
    }

    .v-input--selection-controls__input {
      display: none;
    }

    .ProfileFormCheckbox__label-detail {
      padding-left: 0 !important;
    }
  }
}
</style>
