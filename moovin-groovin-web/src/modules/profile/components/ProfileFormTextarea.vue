<template>
  <ProfileFormCheckbox
    class="ProfileFormTextarea"
    :class="{
      'ProfileFormTextarea--no-checkbox': !checkbox,
      'ProfileFormTextarea--preview': isPreviewTab,
    }"
    :disabled="!checkbox || disabled || checkboxAttrs.disabled"
    v-bind="checkboxAttrs"
    :input-value="checkboxInputValue"
    v-on="checkboxListeners"
  >
    <template #label>
      <slot name="checkbox-label" />
    </template>
    <template #label-detail>
      <slot name="checkbox-label-detail" />
    </template>

    <v-tabs v-model="tabValue">
      <v-tab v-for="tab in tabs" :key="tab.value"> {{ tab.text }} </v-tab>
    </v-tabs>

    <v-textarea
      rows="3"
      auto-grow
      filled
      counter
      persistent-hint
      :validate-on-blur="true"
      :disabled="disabled || (checkbox && !checkboxInputValue)"
      :readonly="isPreviewTab"
      :value="isPreviewTab ? preview : value"
      class="ProfileFormTextarea__textarea"
      v-bind="$attrs"
      v-on="{
        ...$listeners,
        input: onTextareaInput,
      }"
    >
      <template v-if="textareaIsDirty && !isPreviewTab" #append>
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
import {
  computed,
  defineComponent,
  ref,
  toRefs,
  unref,
  watch,
  Ref,
  getCurrentInstance,
} from '@vue/composition-api';

import validateTemplate from '@moovin-groovin/shared/src/lib/TemplateFormatter/utils/validateTemplate';
import useListeners from '@/modules/utils/composables/useListeners';
import pickPrefixed from '@/modules/utils/utils/pickPrefixed';
import ProfileFormCheckbox from './ProfileFormCheckbox.vue';
import useRefRich from '@/modules/utils-reactivity/composables/useRefRich';

const tabs = [
  {
    text: 'Template',
    value: 'template',
    textareaDisabled: false,
  },
  {
    text: 'Preview',
    value: 'preview',
    textareaDisabled: true,
  },
];

const ProfileFormTextarea = defineComponent({
  name: 'ProfileFormTextarea',
  components: {
    ProfileFormCheckbox,
  },
  inheritAttrs: false,
  props: {
    checkbox: { type: Boolean, required: false, default: false },
    checkboxInputValue: { type: Boolean, required: false, default: false },
    value: { type: String, required: false, default: undefined },
    defaultValue: { type: String, required: false, default: undefined },
    disabled: { type: Boolean, required: false, default: false },
  },
  setup(props, { emit }) {
    const { value, defaultValue } = toRefs(props);

    const textareaValue: Ref<string | undefined> = ref();
    const tabValue: Ref<any | undefined> = ref();
    const { ref: preview, setter: setPreview } = useRefRich({ value: '' });

    const instance = getCurrentInstance();
    const { interceptEvent, reemitPrefixedEvents } = useListeners({ emit });

    const checkboxAttrs = computed(() => pickPrefixed(instance?.proxy.$attrs ?? {}, 'checkbox-'));
    const checkboxListeners = reemitPrefixedEvents(
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
    );

    ///////////////////////////////////////////////////////////
    // Generate preview
    ///////////////////////////////////////////////////////////

    const isPreviewTab = computed((): boolean => tabs[unref(tabValue)]?.value === 'preview');
    watch(isPreviewTab, async (newIsPreviewTab) => {
      if (!newIsPreviewTab || !unref(value)) {
        setPreview('');
        return;
      }
      const { result } = await validateTemplate(unref(value));
      setPreview(result || '');
    });

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

    const onTextareaInput = interceptEvent('input', (_, __, newValue?: string) => {
      textareaValue.value = newValue;
    });

    const textareaIsDirty = computed((): boolean =>
      Boolean(unref(defaultValue) && unref(textareaValue) !== unref(defaultValue))
    );

    return {
      onTextareaInput,
      textareaIsDirty,
      checkboxAttrs,
      checkboxListeners,
      tabValue,
      tabs,
      isPreviewTab,
      preview,
    };
  },
});

export default ProfileFormTextarea;
</script>

<style lang="scss">
@import '~vuetify/src/styles/main';
.ProfileFormTextarea {
  &__textarea,
  .v-tabs {
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

  & > .v-input--checkbox .v-messages {
    min-height: unset;
  }

  .v-tabs .v-tabs-bar {
    height: 36px;

    .v-tab {
      font-size: 12px;
    }
  }

  &#{&}--no-checkbox {
    .ProfileFormTextarea__textarea,
    .v-tabs {
      @extend .pl-0;
    }

    .v-input--selection-controls__input {
      display: none;
    }

    .ProfileFormCheckbox__label-detail {
      padding-left: 0 !important;
    }
  }

  &#{&}--preview {
    .v-textarea .v-input__slot {
      &,
      &:hover {
        background-color: rgba(0, 0, 0, 0.03) !important;
      }

      &:after,
      &:before {
        display: none;
      }
    }
  }
}
</style>
