<template>
  <ConfirmDialog v-bind="$attrs" content-class="MembershipBuyDialog" v-on="$listeners">
    <template #activator="{ on, attrs }">
      <slot name="activator" v-bind="{ on, attrs }">
        <v-btn color="primary" v-bind="attrs" v-on="on">
          <slot name="action"> Become Premium Member </slot>
        </v-btn>
      </slot>
    </template>
    <template #dialog-text class="MembershipBuyDialog__body">
      <v-row>
        <v-col class="MembershipBuyDialog__title">
          <v-card-title>
            <h3 class="text-h5 pt-2 px-2">Thank you for your interest</h3>
          </v-card-title>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="MembershipBuyDialog__title">
          <v-card-text>
            <h3 class="text-h5 pt-2 px-2">The membership features are still in development</h3>
          </v-card-text>
        </v-col>
      </v-row>
    </template>
    <template #confirm-text><span class="text-body-1">Buy membership</span></template>
    <template #cancel-action="{ cancel }">
      <v-btn color="primary" outlined @click="cancel"> Cancel </v-btn>
    </template>
  </ConfirmDialog>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import ConfirmDialog from '@/modules/utils/components/ConfirmDialog.vue';

const MembershipBuyDialog = defineComponent({
  name: 'MembershipBuyDialog',
  components: {
    ConfirmDialog,
  },
  inheritAttrs: false,
  setup() {
    return {};
  },
});

export default MembershipBuyDialog;
</script>

<style lang="scss">
.MembershipBuyDialog {
  max-width: 700px;
  overflow: visible;

  &__title {
    text-align: center;

    .v-card__title {
      justify-content: center;
    }
  }

  .row {
    justify-content: center;
    text-align: center;
  }
}
</style>
