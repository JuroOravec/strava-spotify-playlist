<template>
  <v-app id="app" class="App">
    <router-view name="appbar" />
    <v-main>
      <v-container>
        <AuthGuard>
          <router-view name="default" />
          <NotifSnackbar />
          <ConsentAlert />
        </AuthGuard>
      </v-container>
    </v-main>
    <router-view name="footer" />
  </v-app>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, unref } from '@vue/composition-api';

import AuthGuard from '@/modules/auth/components/AuthGuard.vue';
import useCurrentUser from '@/modules/auth/composables/useCurrentUser';
import ConsentAlert from '@/modules/utils/components/ConsentAlert.vue';
import NotifSnackbar from '@/modules/utils/components/NotifSnackbar.vue';
import NotifSnackbarConfirm from '@/modules/utils/components/NotifSnackbarConfirm.vue';
import NotifSnackbarError from '@/modules/utils/components/NotifSnackbarError.vue';
import useNotifSnackbar, { NotifType } from '@/modules/utils/composables/useNotifSnackbar';
import useAnalytics from '@/plugins/analytics/composables/useAnalytics';

const App = defineComponent({
  name: 'App',
  components: {
    AuthGuard,
    NotifSnackbar,
    ConsentAlert,
  },
  setup() {
    const instance = getCurrentInstance();
    const { user, onLogout, onLogin } = useCurrentUser();
    const { addNotifComponents } = useNotifSnackbar();
    const { analytics } = useAnalytics();

    addNotifComponents({
      [NotifType.CONFIRM]: NotifSnackbarConfirm,
      [NotifType.ERROR]: NotifSnackbarError,
    });

    onLogin(() => {
      const { userId } = unref(user) ?? {};
      if (userId) analytics?.identify(userId);
    });

    onLogout(() => {
      analytics?.reset();

      instance?.proxy.$apolloProvider.defaultClient.clearStore();
    });
  },
});

export default App;
</script>

<style lang="scss">
@import '~../styles/main.scss';

.App {
}
</style>
