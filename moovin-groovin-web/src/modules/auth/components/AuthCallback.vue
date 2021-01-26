<template>
  <div v-if="errorData" class="AuthCallback">
    <h2 class="title">Failed to authenticate</h2>
    <p class="body-1">Error: {{ errorData.error }}</p>
    <p class="body-1">Error Code: {{ errorData.code }}</p>
    <p class="body-1">Description: {{ errorData.description }}</p>
    <p class="body-1">Reason: {{ errorData.reason }}</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, unref } from '@vue/composition-api';
import defaults from 'lodash/defaults';

const AuthCallback = defineComponent({
  name: 'AuthCallback',
  setup() {
    const instance = getCurrentInstance();

    const errorData = computed(() => {
      const { error, error_code: code, error_description: description, error_reason: reason } =
        instance?.proxy.$route.query ?? {};

      if (!error && !code && !description && !reason) {
        return null;
      }

      const defaultValues = {
        error: 'UNKNOWN',
        code: 'UNKNOWN',
        description: 'UNKNOWN',
        reason: 'UNKNOWN',
      };

      return defaults(
        {
          error: error,
          code,
          description,
          reason,
        },
        defaultValues
      );
    });

    // Try to close this window (if it was opened via window.open) if there's no error.
    if (!unref(errorData)) {
      window.close();
    }

    // If we can't close it, navigate to home
    instance?.proxy.$router.push({ path: '/' });

    return {
      errorData,
    };
  },
});

export default AuthCallback;
</script>

<style lang="scss">
.AuthCallback {
  .title {
    color: red;
  }
}
</style>
