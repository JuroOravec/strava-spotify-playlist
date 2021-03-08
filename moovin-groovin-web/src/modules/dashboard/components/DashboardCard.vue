<template>
  <v-card
    class="DashboardCard .elevation-3"
    :class="{
      'DashboardCard--no-title': !$slots['title'],
    }"
  >
    <v-row class="DashboardCard__title">
      <v-col cols="auto" class="px-0">
        <v-card-title>
          <slot name="title" />
        </v-card-title>
      </v-col>
      <slot name="title-append" />
    </v-row>

    <v-row class="DashboardCard__title">
      <v-col cols="auto" class="px-0">
        <v-card-subtitle v-if="$slots['subtitle']" class="pt-0">
          <slot name="subtitle" />
        </v-card-subtitle>
      </v-col>
      <slot name="title-append" />
    </v-row>

    <v-card-text class="DashboardCard__body">
      <slot />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

const DashboardCard = defineComponent({
  name: 'DashboardCard',
});

export default DashboardCard;
</script>

<style lang="scss">
.DashboardCard {
  display: flex !important;
  flex-direction: column;
  padding: 3 * $spacer !important;

  &__title {
    margin: 3 * $spacer 0 !important;

    .col {
      padding-bottom: 0;
      padding-top: 0;
    }
    .v-card__title {
      padding-bottom: 0;
      padding-top: 0;
    }
  }

  &--no-title {
    .DashboardCard__title {
      margin-top: 0;
      margin-bottom: 0;
    }
  }
}
</style>
