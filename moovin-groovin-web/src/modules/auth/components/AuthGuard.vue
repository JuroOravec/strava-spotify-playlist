<template>
  <div class="AuthGuard">
    <slot v-if="canSeeContent" />
    <div v-else class="AuthGuard__unauth-message">
      <h2 class="text-h5 px-3 py-7">Unauthorized access 😱</h2>

      <router-link to="/">
        <v-btn> Back to homepage </v-btn>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, unref, watch } from '@vue/composition-api';

import useCurrentUser from '@/modules/auth/composables/useCurrentUser';

const AuthGuard = defineComponent({
  name: 'AuthGuard',
  setup() {
    const instance = getCurrentInstance();
    const { isLoggedIn } = useCurrentUser();

    const canSeeContent = computed((): boolean => {
      const { requireAuth = true } = instance?.proxy.$route?.meta ?? {};
      return !requireAuth || unref(isLoggedIn);
    });

    watch(canSeeContent, (newCanSeeContent) => {
      if (!unref(newCanSeeContent)) {
        instance?.proxy.$router.push('/');
      }
    });

    return {
      canSeeContent,
    };
  },
});

export default AuthGuard;
</script>

<style lang="scss">
.AuthGuard {
  &__unauth-message {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
