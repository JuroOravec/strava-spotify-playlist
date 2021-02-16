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
  </v-app>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from '@vue/composition-api';

import AuthGuard from '@/modules/auth/components/AuthGuard.vue';
import useCurrentUser from '@/modules/auth/composables/useCurrentUser';
import NotifSnackbar from '@/modules/utils/components/NotifSnackbar.vue';
import NotifSnackbarConfirm from '@/modules/utils/components/NotifSnackbarConfirm.vue';
import NotifSnackbarError from '@/modules/utils/components/NotifSnackbarError.vue';
import useNotifSnackbar, { NotifType } from '@/modules/utils/composables/useNotifSnackbar';

const App = defineComponent({
  name: 'App',
  components: {
    AuthGuard,
    NotifSnackbar,
  },
  setup() {
    const instance = getCurrentInstance();
    const { onLogout } = useCurrentUser();
    const { addNotifComponents } = useNotifSnackbar();

    addNotifComponents({
      [NotifType.CONFIRM]: NotifSnackbarConfirm,
      [NotifType.ERROR]: NotifSnackbarError,
    });

    onLogout(() => {
      instance?.proxy.$apolloProvider.defaultClient.clearStore();
    });
  },
});

export default App;
</script>

<style lang="scss">
@import '~@/plugins/vuetify/vuetify.scss';
@import '~../styles/main.scss';

.App {
}
</style>
