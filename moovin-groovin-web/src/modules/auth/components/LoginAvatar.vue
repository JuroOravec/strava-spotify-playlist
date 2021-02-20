<template>
  <div class="LoginAvatar" :class="{ 'LoginAvatar--logged-in': user }">
    <v-btn
      v-if="!user"
      class="LoginAvatar__avatar"
      outlined
      color="#dddddd"
      v-bind="$attrs"
      v-on="$listeners"
    >
      LOGIN
    </v-btn>
    <v-btn
      v-else
      class="LoginAvatar__avatar"
      outlined
      fab
      small
      color="#dddddd"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <v-avatar size="36">
        <v-img v-if="user.photo" :src="user.photo" contain>
          <div class="LoginAvatar__avatar-overlay transition-fast-in-fast-out" />
        </v-img>
        <span v-else>
          {{ userInitials }}
        </span>
      </v-avatar>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, unref } from '@vue/composition-api';

import useCurrentUser from '../composables/useCurrentUser';

const LoginAvatar = defineComponent({
  name: 'LoginAvatar',
  inheritAttrs: false,
  setup() {
    const { user } = useCurrentUser();

    const userInitials = computed(() => {
      const { nameFamily, nameGiven, nameDisplay } = unref(user) ?? {};

      const names = nameFamily && nameGiven ? [nameGiven, nameFamily] : nameDisplay?.split(' ');
      if (!names?.length) return 'You';
      return names.map((name) => name[0]).join('');
    });

    return {
      user,
      userInitials,
    };
  },
});

export default LoginAvatar;
</script>

<style lang="scss">
@import '~vuetify/src/styles/main';
$name: LoginAvatar;

.#{$name} {
  &__avatar {
    border-width: 2px;

    &-overlay {
      @extend .transition-fast-in-fast-out;

      height: 100%;
      width: 100%;

      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }
    }
  }

  &--logged-in {
    .#{$name}__avatar {
      border-radius: 50px;

      .v-btn__content {
        @extend .body-2;
        font-weight: bold !important;
      }
    }
  }
}
</style>
