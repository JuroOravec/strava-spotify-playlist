<template>
  <ProfileFormCheckbox
    class="ProfileFormTextarea"
    :class="{
      'ProfileFormTextarea--no-checkbox': !checkbox,
      'ProfileFormTextarea--disabled': checkbox && !checkboxInputValue,
    }"
    :input-value="checkboxInputValue"
    v-on="
      prefixEvents(
        [
          'change',
          'click',
          'click:append',
          'click:prepend',
          'mousedown',
          'mouseup',
          'update:error',
          'update:indeterminate',
        ],
        'checkbox-'
      )
    "
  >
    <template #label>
      <slot name="checkbox-label" />
    </template>
    <template #label-detail>
      <slot name="checkbox-label-detail" />
    </template>
    <v-textarea
      rows="3"
      auto-grow
      filled
      counter
      persistent-hint
      :validate-on-blur="true"
      :disabled="checkbox && !checkboxInputValue"
      :value="value"
      class="ProfileFormTextarea__textarea"
      v-bind="$attrs"
      v-on="{
        ...$listeners,
        input: onTextareaInput,
      }"
    >
      <template v-if="textareaIsDirty" #append>
        <v-btn icon x-small @click="$emit('cancel')">
          <v-icon>cancel</v-icon>
        </v-btn>
      </template>

      <!-- Pass on all named slots -->
      <slot v-for="slot in Object.keys($slots)" :slot="slot" :name="slot" />

      <!-- Pass on all scoped slots -->
      <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </v-textarea>
  </ProfileFormCheckbox>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs, unref, watch, Ref } from '@vue/composition-api';

import useListeners from '@/modules/utils/composables/useListeners';
import ProfileFormCheckbox from './ProfileFormCheckbox.vue';

const ProfileFormTextarea = defineComponent({
  name: 'ProfileFormTextarea',
  components: {
    ProfileFormCheckbox,
  },
  inheritAttrs: false,
  props: {
    checkbox: { type: Boolean, default: false },
    checkboxInputValue: { type: Boolean, default: false },
    value: { type: String, default: undefined },
    defaultValue: { type: String, default: undefined },
  },
  setup(props, { emit }) {
    const { value, defaultValue } = toRefs(props);

    const textareaValue: Ref<string | undefined> = ref();

    ///////////////////////////////////////////////////////////
    // Detect when textarea value differs from default value
    ///////////////////////////////////////////////////////////

    watch(
      value,
      (newValue) => {
        textareaValue.value = newValue;
      },
      { immediate: true }
    );

    const { interceptEvent, prefixEvents } = useListeners({ emit });

    const onTextareaInput = interceptEvent('input', (_, __, newValue?: string) => {
      textareaValue.value = newValue;
    });

    const textareaIsDirty = computed((): boolean =>
      Boolean(unref(defaultValue) && unref(textareaValue) !== unref(defaultValue))
    );

    return {
      onTextareaInput,
      textareaIsDirty,
      prefixEvents,
    };
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
    flex-direction: row;
  }

  .v-input__append-inner {
    margin-top: 10px !important;
  }

  textarea {
    @extend .text-body-2;
    margin-bottom: 10px !important;
  }

  .v-messages {
    display: initial;
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
