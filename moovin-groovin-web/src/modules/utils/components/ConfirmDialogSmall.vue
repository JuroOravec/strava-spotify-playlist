<template>
  <ConfirmDialog
    class="ConfirmDialogSmall"
    v-bind="$attrs"
    :width="width"
    :content-class="usedContentClass"
    v-on="$listeners"
  >
    <!-- Pass on all named slots -->
    <slot v-for="slot in Object.keys($slots)" :slot="slot" :name="slot" />

    <!-- Pass on all scoped slots -->
    <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope">
      <slot :name="slot" v-bind="scope" />
    </template>

    <template #default="{ confirm, cancel }">
      <v-card class="ConfirmDialogSmall__dialog-content">
        <v-row class="ConfirmDialogSmall__title">
          <v-col>
            <v-card-title>
              <slot name="dialog-title"> Are you sure? </slot>
            </v-card-title>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card-text>
              <slot name="dialog-text" />
            </v-card-text>
          </v-col>
        </v-row>
        <v-row class="ConfirmDialogSmall__actions">
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
                <v-btn color="primary" outlined dark @click="cancel">
                  <slot name="cancel-text">Cancel</slot>
                </v-btn>
              </slot>
            </v-col>
          </slot>
        </v-row>
      </v-card>
    </template>
  </ConfirmDialog>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs, unref } from '@vue/composition-api';

import ConfirmDialog from './ConfirmDialog.vue';

const ConfirmDialogSmall = defineComponent({
  name: 'ConfirmDialogSmall',
  components: {
    ConfirmDialog,
  },
  inheritAttrs: false,
  props: {
    width: { type: String, required: false, default: '350px' },
    contentClass: { type: String, required: false, default: '' },
  },
  setup(props) {
    const { contentClass } = toRefs(props);

    const usedContentClass = computed(
      (): string => `${unref(contentClass)} ConfirmDialogSmall__dialog`
    );

    return {
      usedContentClass,
    };
  },
});

export default ConfirmDialogSmall;
</script>

<style lang="scss">
@import '~vuetify/src/styles/main';

.ConfirmDialogSmall {
  &__dialog,
  &__dialog-content {
    height: 200px;

    .col {
      padding-bottom: 0;
    }

    .v-card__title {
      padding-bottom: 0;
      justify-content: center;
    }
  }

  &__title {
    margin-top: 0;
  }

  &__actions {
    @extend .px-8, .pt-5;
    flex: 0 0 auto;
  }
}
</style>
