<template>
  <v-row class="ProfilePreferences">
    <v-col>
      <ProfileCard>
        <template slot="title">Playlist</template>
        <v-col class="d-flex flex-column">
          <ProfileFormCheckbox>
            <template #label> Set new playlists as Public </template>
            <template #label-detail>
              What is a
              <a href="https://support.spotify.com/us/article/set-playlist-privacy/"
                >public playlist</a
              >?
            </template>
          </ProfileFormCheckbox>

          <ProfileFormCheckbox>
            <template #label> Set new playlists as Collaborative </template>
            <template #label-detail>
              What is a
              <a href="https://support.spotify.com/us/article/create-playlists-with-your-friends/"
                >collaborative playlist</a
              >?
            </template>
          </ProfileFormCheckbox>

          <ProfileFormCheckbox>
            <template #label> Automatically create playlist after activity </template>
            <template #label-detail>
              Note: This is the only way to create a playlist for activity currently.
            </template>
          </ProfileFormCheckbox>

          <ProfileFormTextarea>
            <template #label> Customize playlist title </template>
            <template #label-detail>
              Specify what should go into the playlist title. Title is trimmed to 100 characters
              after formatting.
            </template>
          </ProfileFormTextarea>

          <ProfileFormTextarea>
            <template #label> Customize playlist description </template>
            <template #label-detail>
              Specify what should go into the playlist description. Description is trimmed to 300
              characters after formatting.
            </template>
          </ProfileFormTextarea>

          <TemplateHint class="pt-4" />
        </v-col>
      </ProfileCard>

      <ProfileCard>
        <template slot="title">Activity</template>
        <v-col class="d-flex flex-column">
          <ProfileFormTextarea :checkbox="true">
            <template #label> Customize activity description </template>
            <template #label-detail>
              Specify what should go into the activity description.
            </template>
          </ProfileFormTextarea>

          <TemplateHint class="pt-4" />
        </v-col>
      </ProfileCard>

      <ProfileCard>
        <v-col cols="auto">
          <v-btn color="primary">
            <slot name="action"> Save changes </slot>
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn color="primary" dark outlined>
            <slot name="action"> Discard changes </slot>
          </v-btn>
        </v-col>
      </ProfileCard>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import useCurrentUser from '@/modules/auth/composables/useCurrentUser';
import ProfileCard from './ProfileCard.vue';
import TemplateHint from './TemplateHint.vue';
import ProfileFormCheckbox from './ProfileFormCheckbox.vue';
import ProfileFormTextarea from './ProfileFormTextarea.vue';

const ProfilePreferences = defineComponent({
  name: 'ProfilePreferences',
  components: {
    ProfileCard,
    ProfileFormCheckbox,
    ProfileFormTextarea,
    TemplateHint,
  },
  setup() {
    // const { deleteUser } = useCurrentUserConfig();
    // return {
    //   deleteUser,
    // };
  },
});

export default ProfilePreferences;
</script>

<style lang="scss">
@import '@/plugins/vuetify/vuetify';
.ProfilePreferences {
  .ProfileFormCheckbox:nth-child(1) .v-input--checkbox {
    margin-top: 0 !important;
  }
}
</style>
