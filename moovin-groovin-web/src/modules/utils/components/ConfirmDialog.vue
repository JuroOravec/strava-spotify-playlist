<template>
  <v-dialog
    class="ConfirmDialog"
    content-class="ConfirmDialog__dialog"
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
import { defineComponent, Ref, unref, ref, toRefs, watch } from '@vue/composition-api';

import makeSetter from '@/modules/utils/utils/vue/makeSetter';

/** Wrapper around v-dialog that handles open/close logic */
const ConfirmDialog = defineComponent({
  name: 'ConfirmDialog',
  inheritAttrs: false,
  props: {
    value: { type: Boolean, required: false, default: false },
  },
  setup(props, { emit }) {
    const { value } = toRefs(props);

    const internalValue: Ref<boolean> = ref(unref(value));
    const setInternalValue = makeSetter(internalValue);

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

    return {
      confirm,
      cancel,
      internalValue,
      setInternalValue,
    };
  },
});

export default ConfirmDialog;
</script>
