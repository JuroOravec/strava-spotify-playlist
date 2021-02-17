<template>
  <div class="PrivacyPolicy">
    <h2 class="text-h4 py-4">Privacy Policy</h2>

    <h3 class="text-h5 py-4">Privacy and data protection</h3>

    <p>
      MoovinGroovin receives activities and creates playlists asynchronously (it can occur when
      you're not logged in through a browser). Therefore, user information needs to be stored.
    </p>

    <p>
      To reliably match your account with Strava and Spotify integrations, MoovinGroovin uses an
      additional third party integration (Facebook, Google) for authentication. For any of these
      integrations,
      <b
        >MoovinGroovin stores the access token granted by you until you either remove the
        integration or delete your account</b
      >. Therefore, no passwords are required nor stored.
    </p>

    <p>
      To enhance user experience on the webpage,
      <b
        >MoovinGroovin stores and uses following personal information: first and last name, email,
        and profile photo.</b
      >
    </p>

    <p>
      All personal information is removed upon account deletion. You may delete your account in
      <template v-if="isLoggedIn"
        ><router-link :to="{ name: ProfileRoute.ACCOUNT }">your profile</router-link>.</template
      >
      <template v-else>your profile when logged in.</template>
    </p>
    <p>
      If you have difficulties deleting your account or cannot access your account, send an email to
      juraj.oravec.josefson at gmail.com.
    </p>

    <p>
      MoovinGroovin enables you to configure how playlists should be created and how activities
      should be updated using text templates. When a playlist is being created, these templates are
      formatted, sent to Strava or Spotify, and may end up public.
      <b
        >It is highly recommended NOT to include personal information in these templates as
        MoovinGroovin cannot guarantee their discretion.</b
      >
    </p>

    <p>To request your personal information send an email to juraj.oravec.josefson at gmail.com.</p>

    <h3 class="text-h5 py-4">Cookies</h3>

    <p>
      This website uses session cookies for user authentication. Cookies are stored for 30 days
      since the last activity.
    </p>

    <p>
      Cookies can be removed from your browser following
      <a
        href="https://support.google.com/accounts/answer/32050?co=GENIE.Platform%3DDesktop&hl=en"
        target="_blank"
        rel="noopener"
        >a guide like this one for Chrome.</a
      >
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import useCurrentUser from '@/modules/auth/composables/useCurrentUser';
import { ProfileRoute } from '@/modules/profile/types';

const PrivacyPolicy = defineComponent({
  name: 'PrivacyPolicy',
  setup() {
    const { isLoggedIn } = useCurrentUser();

    return {
      isLoggedIn,
      ProfileRoute,
    };
  },
});

export default PrivacyPolicy;
</script>

<style lang="scss">
.PrivacyPolicy {
}
</style>
>
