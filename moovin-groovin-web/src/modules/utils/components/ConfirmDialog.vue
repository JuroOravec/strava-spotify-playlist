<template>
  <v-dialog
    class="ConfirmDialog"
    :content-class="usedContentClass"
    :value="internalValue"
    v-bind="$attrs"
    v-on="{
      ...$listeners,
      input: onInput,
      'click:outside': onClickOutside,
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
        <v-row class="ConfirmDialog__actions">
          <slot name="actions" v-bind="{ confirm, cancel }">
            <v-col class="col-auto">
              <slot name="confirm-action" v-bind="{ confirm }">
                <v-btn color="primary" dark @click="confirm">
                  <slot name="confirm-text">Confirm</slot>
                </v-btn>
              </slot>
            </v-col>
            <v-col class="col-auto">
              <slot name="cancel-action" v-bind="{ cancel }">
                <v-btn color="primary" outlined @click="cancel">
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
import useListeners from '../composables/useListeners';

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

    const { interceptEvent } = useListeners({ emit });

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

    const onInput = interceptEvent('input', (event, _, newVal: boolean) =>
      setInternalValue(newVal)
    );

    const onClickOutside = interceptEvent('click:outside', cancel);

    const usedContentClass = computed((): string => `${unref(contentClass)} ConfirmDialog__dialog`);

    return {
      confirm,
      cancel,
      internalValue,
      usedContentClass,
      onInput,
      onClickOutside,
    };
  },
});

export default ConfirmDialog;
</script>

<style lang="scss">
.ConfirmDialog {
  height: 400px;
  &__actions {
    padding-top: $spacer * 3;
    padding-bottom: $spacer * 3;
    justify-content: space-evenly;
    text-align: center;
  }
}
</style>
