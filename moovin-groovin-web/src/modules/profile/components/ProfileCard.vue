<template>
  <v-card class="ProfileCard" :class="{ 'ProfileCard--no-title': !$slots['title'] }">
    <v-row class="ProfileCard__title">
      <v-col cols="auto" class="px-0">
        <v-card-title>
          <slot name="title" />
        </v-card-title>
      </v-col>
      <slot name="title-append" />
    </v-row>

    <v-card-text class="ProfileCard__body">
      <v-row>
        <slot />
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

const ProfileCard = defineComponent({
  name: 'ProfileCard',
});

export default ProfileCard;
</script>

<style lang="scss">
@import '@/plugins/vuetify/vuetify';
.ProfileCard {
  @extend .elevation-3, .pa-3;

  & + & {
    @extend .mt-8;
  }

  &__title {
    @extend .my-3, .mx-0;

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
    .ProfileCard__title {
      @extend .my-0;
    }
  }
}
</style>
