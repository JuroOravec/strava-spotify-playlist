<template>
  <v-row>
    <v-col>
      <ProfileCard>
        <template slot="title">Danger Zone</template>
        <v-col>
          <v-row>
            <v-col>
              <WarningIrreversible />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="auto">
              <ConfirmDialogSmall @confirm="deleteUser">
                <template #activator="{ on, attrs }">
                  <v-btn v-bind="attrs" color="red lighten-2" dark outlined v-on="on">
                    <slot name="action"> Delete Account </slot>
                  </v-btn>
                </template>
                <template #dialog-title> Delete account? </template>
                <template #dialog-text>
                  <WarningIrreversible class="text-center" />
                </template>
                <template #confirm-action="{ confirm }">
                  <v-btn color="red lighten-2" dark @click="confirm">
                    <slot name="confirm-text">Delete</slot>
                  </v-btn>
                </template>
              </ConfirmDialogSmall>
            </v-col>
          </v-row>
        </v-col>
      </ProfileCard>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import useCurrentUser from '@/modules/auth/composables/useCurrentUser';
import ConfirmDialogSmall from '@/modules/utils/components/ConfirmDialogSmall.vue';
import ProfileCard from './ProfileCard.vue';
import WarningIrreversible from './WarningIrreversible.vue';

const ProfileAccount = defineComponent({
  name: 'ProfileAccount',
  components: {
    ProfileCard,
    ConfirmDialogSmall,
    WarningIrreversible,
  },
  setup() {
    const { deleteUser } = useCurrentUser();
    return {
      deleteUser,
    };
  },
});

export default ProfileAccount;
</script>

<style lang="scss">
@import '@/plugins/vuetify/vuetify';
.ProfileAccount {
  &__item {
    & + & {
      @extend .mt-8;
    }
  }
}
</style>
