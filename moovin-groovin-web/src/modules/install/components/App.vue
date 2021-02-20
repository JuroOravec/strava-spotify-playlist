<template>
  <v-app id="app" class="App">
    <router-view name="appbar" />
    <v-main>
      <v-container>
        <AuthGuard>
          <router-view name="default" />
          <NotifSnackbar />
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
      const { userId, email, photo, nameDisplay, nameFamily, nameGiven } = unref(user) ?? {};
      if (userId) {
        // See https://help.mixpanel.com/hc/en-us/articles/115004708186-Profile-Properties#list-properties
        analytics?.identify(userId, {
          $avatar: photo,
          $email: email,
          $first_name: nameGiven,
          $last_name: nameFamily,
          $name: nameDisplay,
        });
      }
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
