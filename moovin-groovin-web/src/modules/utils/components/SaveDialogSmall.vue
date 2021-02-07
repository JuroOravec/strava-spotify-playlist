<template>
  <ConfirmDialogSmall
    class="SaveDialogSmall"
    width="420px"
    content-class="SaveDialogSmall__dialog"
    v-bind="$attrs"
    v-on="{ ...$listeners, confirm: onConfirm }"
  >
    <!-- Pass on all named slots -->
    <slot v-for="slot in Object.keys($slots)" :slot="slot" :name="slot" />

    <!-- Pass on all scoped slots -->
    <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope">
      <slot :name="slot" v-bind="scope" />
    </template>

    <template #dialog-title>
      <slot name="dialog-title"> Save changes? </slot>
    </template>

    <template #actions="{ confirm, cancel }">
      <slot name="actions" v-bind="{ confirm, cancel, discard: createDiscard(confirm) }">
        <v-col>
          <slot name="confirm-action" v-bind="{ confirm }">
            <v-btn color="primary" @click="confirm">
              <slot name="confirm-text">Confirm</slot>
            </v-btn>
          </slot>
        </v-col>
        <v-col>
          <slot name="discard-action" v-bind="{ discard: createDiscard(confirm) }">
            <v-btn color="primary" outlined @click="createDiscard(confirm)()">
              <slot name="discard-text">Discard</slot>
            </v-btn>
          </slot>
        </v-col>
        <v-spacer />
        <v-col>
          <slot name="cancel-action" v-bind="{ cancel }">
            <v-btn color="secondary" text @click="cancel">
              <slot name="cancel-text">Cancel</slot>
            </v-btn>
          </slot>
        </v-col>
      </slot>
    </template>
  </ConfirmDialogSmall>
</template>

<script lang="ts">
import { defineComponent, ref, unref } from '@vue/composition-api';

import useListeners from '../composables/useListeners';
import ConfirmDialogSmall from './ConfirmDialogSmall.vue';

const SaveDialogSmall = defineComponent({
  name: 'SaveDialogSmall',
  components: {
    ConfirmDialogSmall,
  },
  inheritAttrs: false,
  setup(_, { emit }) {
    const triggeredDiscard = ref(false);

    const { interceptEvent } = useListeners({ emit });

    const createDiscard = (confirmHandler: () => void) => () => {
      triggeredDiscard.value = true;
      // This triggers the confirm dialog to emit 'confirm' and close dialog
      confirmHandler();
      emit('discard');
    };

    const onConfirm = interceptEvent('confirm', (event, cancelEvent) => {
      if (!unref(triggeredDiscard)) return;
      // Catch and cancel the 'confirm' event that was triggered by discard event handler
      triggeredDiscard.value = false;
      cancelEvent();
    });

    return {
      createDiscard,
      onConfirm,
    };
  },
});

export default SaveDialogSmall;
</script>

<style lang="scss">
.SaveDialogSmall {
  &__dialog {
    .ConfirmDialogSmall__dialog-content {
      height: 180px;
    }
  }
}
</style>
