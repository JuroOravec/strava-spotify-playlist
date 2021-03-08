<template>
  <div class="Home">
    <h1 class="text-h3 text-sm-h2 font-weight-bold py-10">MoovinGroovin</h1>
    <h2 class="text-h4 pb-10">
      Run wild with your sport music selection. <br />
      We will save it for you.
    </h2>

    MoovinGroovin creates Spotify playlists from songs you played during your Strava activities.
    Enjoy the moment, knowing you won't have to stop every time you want to save a song.

    <h3 class="text-h5 pt-12 pb-4">Save the songs that keep you moving</h3>

    <ol>
      <li>Login and connect your Strava and Spotify accounts to MoovinGroovin.</li>
      <li>Go for a run or bike. Start a Strava activity and put on your fave songs on Spotify!</li>
      <li>When done, save your activity.</li>
      <li>
        Take a nice shower, drink a glass of water and relax. In 5-30 mins, a new playlist will be
        created for you with the songs you listened to during the activity.
      </li>
    </ol>

    <div class="pt-12 pb-4">
      <LightboxImg
        :src="require('../assets/example-spotify.png')"
        alt="Example Spotify playlist"
        :max-width="600"
      />
    </div>

    <h3 class="text-h5 pt-12 pb-4">How it works</h3>

    <p>MoovinGroovin integrates with your Strava and Spotify accounts.</p>
    <p class="pb-8">
      When you finish an activity, MoovinGroovin receives a message from Strava. MoovinGroovin then
      asks Spotify for songs played at that time. New Spotify playlist is then created from those
      songs.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import LightboxImg from '@/modules/utils/components/LightboxImg.vue';

const Home = defineComponent({
  name: 'Home',
  components: {
    LightboxImg,
  },
});

export default Home;
</script>

<style lang="scss">
@import 'vuetify/src/styles/styles';
.Home {
  li {
    padding-bottom: $spacer * 2;

    &::marker {
      padding-right: $spacer;
    }
  }
}
</style>
>
