<template>
  <div class="MembershipOfferDialog__wrapper">
    <ConfirmDialog
      v-bind="$attrs"
      :content-class="
        [
          'MembershipOfferDialog',
          $vuetify.breakpoint.mdAndUp ? 'MembershipOfferDialog--md' : '',
        ].join(' ')
      "
      v-on="{
        ...$listeners,
        confirm: onConfirm,
        cancel: onCancel,
      }"
    >
      <template #activator="{ on, attrs }">
        <slot name="activator" v-bind="{ on, attrs }">
          <v-btn color="primary" v-bind="attrs" v-on="on">
            <slot name="action"> Become Premium Member </slot>
          </v-btn>
        </slot>
      </template>
      <template #dialog-text class="MembershipOfferDialog__body">
        <v-row>
          <v-col class="MembershipOfferDialog__title">
            <v-card-title>
              <h3 class="text-h5 pt-2 px-2">
                Find the music that takes your performance to the next level
              </h3>
            </v-card-title>
            <v-card-subtitle class="pb-0">
              <h3 class="text-body-1 pt-2 px-2">MoovinGroovin is still in alpha development.</h3>
            </v-card-subtitle>
          </v-col>
        </v-row>
        <v-row class="pb-3 px-5">
          <v-col
            class="MembershipOfferDialog__option col-12 col-sm-auto mb-4"
            :class="{ 'px-0': $vuetify.breakpoint.xsOnly, 'pa-4': $vuetify.breakpoint.smAndUp }"
          >
            <v-card>
              <v-card-title> Basic </v-card-title>
              <v-card-subtitle> (current) </v-card-subtitle>
              <v-card-text>
                <ul>
                  <li>Save activities from past 24 hours</li>
                </ul>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col
            class="MembershipOfferDialog__option col-12 col-sm-auto mb-4"
            :class="{ 'px-0': $vuetify.breakpoint.xsOnly, 'pa-4': $vuetify.breakpoint.smAndUp }"
          >
            <v-card>
              <v-card-title> Early access </v-card-title>
              <v-card-subtitle> $5 one time payment </v-card-subtitle>
              <v-card-text>
                <ul>
                  <li>Save activities from past 30 days</li>
                  <li>Music vs Performance analytics</li>
                  <li>Track songs on map</li>
                  <li>Tailored Spotify playlists</li>
                </ul>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </template>
      <template #confirm-text><span class="text-body-1">Request early access</span></template>
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

  &--md {
    overflow: visible;
  }

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

  .ConfirmDialog__actions {
    justify-content: center;
    text-align: center;
  }
}
</style>
