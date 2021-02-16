<template>
  <v-dialog
    class="ConfirmDialog"
    :content-class="usedContentClass"
    :value="internalValue"
    v-bind="$attrs"
    v-on="{
      ...$listeners,
      input: setInternalValue,
    }"
  >
    <template #activator="activatorProps">
      <slot name="activator" v-bind="activatorProps">
        <v-btn color="primary" dark v-bind="activatorProps.attrs" v-on="activatorProps.on">
          Open
        </v-btn>
      </slot>
    </template>
    <slot name="default" v-bind="{ confirm, cancel }">
      <v-card class="ConfirmDialog__dialog">
        <v-row>
          <v-col>
            <slot name="dialog-text" />
          </v-col>
        </v-row>
        <v-row>
          <slot name="actions" v-bind="{ confirm, cancel }">
            <v-col>
              <slot name="confirm-action" v-bind="{ confirm }">
                <v-btn color="primary" dark @click="confirm">
                  <slot name="confirm-text">Confirm</slot>
                </v-btn>
              </slot>
            </v-col>
            <v-spacer />
            <v-col>
              <slot name="cancel-action" v-bind="{ cancel }">
                <v-btn color="primary" dark @click="cancel">
                  <slot name="cancel-text">Cancel</slot>
                </v-btn>
              </slot>
            </v-col>
          </slot>
        </v-row>
      </v-card>
    </slot>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, unref, toRefs, watch, computed } from '@vue/composition-api';

import useRefRich from '@/modules/utils-reactivity/composables/useRefRich';

/** Wrapper around v-dialog that handles open/close logic */
const ConfirmDialog = defineComponent({
  name: 'ConfirmDialog',
  inheritAttrs: false,
  props: {
    value: { type: Boolean, required: false, default: false },
    contentClass: { type: String, required: false, default: '' },
  },
  setup(props, { emit }) {
    const { value, contentClass } = toRefs(props);

    const { ref: internalValue, setter: setInternalValue } = useRefRich({ value });

    watch(value, setInternalValue);
    watch(internalValue, (newVal) => emit('input', newVal));

    const confirm = () => {
      emit('confirm');
      setInternalValue(false);
    };
    const cancel = () => {
      emit('cancel');
      setInternalValue(false);
    };

    const usedContentClass = computed((): string => `${unref(contentClass)} ConfirmDialog__dialog`);

    return {
      confirm,
      cancel,
      internalValue,
      setInternalValue,
      usedContentClass,
    };
  },
});

export default ConfirmDialog;
</script>
