<template>
  <div>
    <ConfirmDialog
      v-bind="$attrs"
      content-class="MembershipOfferDialog"
      v-on="{
        ...$listeners,
        confirm: onConfirm,
        cancel: onCancel,
      }"
    >
      <template #activator="{ on, attrs }">
        <v-btn color="primary" v-bind="attrs" v-on="on">
          <slot name="action"> Become Premium Member </slot>
        </v-btn>
      </template>
      <template #dialog-text class="MembershipOfferDialog__body">
        <v-row>
          <v-col class="MembershipOfferDialog__title">
            <v-card-title>
              <h3 class="text-h5 pt-2 px-2">
                Find the music that takes your performance to the next level
              </h3>
            </v-card-title>
          </v-col>
        </v-row>
        <v-row class="pb-3 px-5">
          <v-col class="MembershipOfferDialog__option col-12 col-sm-auto pa-sm-4 mb-4">
            <v-card>
              <v-card-title> Basic account </v-card-title>
              <v-card-subtitle> FREE (current) </v-card-subtitle>
              <v-card-text>
                <ul>
                  <li>Save activities from past 24 hours</li>
                </ul>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col class="MembershipOfferDialog__option col-12 col-sm-auto pa-sm-4 mb-4">
            <v-card>
              <v-card-title> Premium account </v-card-title>
              <v-card-subtitle> (£5 / mo) </v-card-subtitle>
              <v-card-text>
                <ul>
                  <li>Music vs Performance analytics</li>
                  <li>Tailored Spotify playlists</li>
                  <li>Save activities from past 30 days</li>
                </ul>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </template>
      <template #confirm-text><span class="text-body-1">Buy membership</span></template>
      <template #cancel-action="{ cancel }">
        <v-btn color="primary" outlined @click="cancel"> Cancel </v-btn>
      </template>
    </ConfirmDialog>
    <MembershipBuyDialog
      :value="buyDialogIsOpen"
      @cancel="setBuyDialogIsOpen(false)"
      @confirm="setBuyDialogIsOpen(false)"
    >
      <template #activator>
        <div />
      </template>
    </MembershipBuyDialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import ConfirmDialog from '@/modules/utils/components/ConfirmDialog.vue';
import MembershipBuyDialog from './MembershipBuyDialog.vue';
import useRefRich from '@/modules/utils-reactivity/composables/useRefRich';
import useListeners from '@/modules/utils/composables/useListeners';

const MembershipOfferDialog = defineComponent({
  name: 'MembershipOfferDialog',
  components: {
    ConfirmDialog,
    MembershipBuyDialog,
  },
  inheritAttrs: false,
  setup(_, { emit }) {
    const { ref: buyDialogIsOpen, setter: setBuyDialogIsOpen } = useRefRich({ value: false });

    const { interceptEvent } = useListeners({ emit });

    const onConfirm = interceptEvent('confirm', () => setBuyDialogIsOpen(true));
    const onCancel = interceptEvent('cancel', () => setBuyDialogIsOpen(false));

    return {
      buyDialogIsOpen,
      setBuyDialogIsOpen,
      onConfirm,
      onCancel,
    };
  },
});

export default MembershipOfferDialog;
</script>

<style lang="scss">
.MembershipOfferDialog {
  max-width: 700px;
  overflow: visible;

  &__title {
    text-align: center;

    .v-card__title {
      justify-content: center;
    }
  }

  &__option {
    max-width: 350px;
    justify-content: center;

    .v-card {
      height: 100%;
      margin: $spacer * 4;
    }
    .v-card__title {
      justify-content: center;
    }
    .v-card__subtitle {
      text-align: center;
    }
    .v-card__text {
      width: fit-content;
      margin: auto;
    }
    li {
      text-align: initial;
    }
  }

  .row {
    justify-content: center;
    text-align: center;
  }

  .ConfirmDialog__action {
  }
}
</style>