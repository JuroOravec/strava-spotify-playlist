<template>
  <v-card class="ProfileCard">
    <v-row class="ProfileCard__header">
      <v-col cols="auto" class="px-0">
        <v-card-title>
          <slot name="title" />
        </v-card-title>
      </v-col>
      <slot name="title-append" />
    </v-row>

    <v-card-text class="ProfileCard__body">
      <v-row>
        <slot name="body" />
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

  &__header {
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
}
</style>
