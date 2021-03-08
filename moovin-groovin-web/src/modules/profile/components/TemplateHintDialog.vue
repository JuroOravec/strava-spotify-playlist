<template>
  <v-dialog
    v-model="dialogIsOpen"
    class="TemplateHintDialog"
    content-class="TemplateHintDialog__dialog"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template #activator="activatorProps">
      <slot name="activator" v-bind="activatorProps">
        <v-row
          align-items="center"
          class="TemplateHintDialog__activator"
          v-bind="activatorProps.attrs"
          v-on="activatorProps.on"
        >
          <v-col cols="auto" class="pr-1 py-0">
            <v-icon small>info_outline</v-icon>
          </v-col>
          <v-col class="pa-0"> How to include playlist and activity data in templates? </v-col>
        </v-row>
      </slot>
    </template>
    <slot name="default">
      <v-card class="ConfirmDialog__dialog">
        <v-row class="text-body-2 ma-0 px-6 pa-5">
          <v-col>
            <h3 class="text-h6 pb-3">Edit text in Spotify playlists and Strava activities.</h3>
            <p>
              When a playlist is being created, we use the templates defined in
              <router-link
                :to="{ to: ProfileRoute.PREFERENCES }"
                @click.native="setDialogIsOpen(false)"
                >Preferences</router-link
              >
              <span class="font-weight-bold">
                to create playlist title, playlist description, and update activity description.
              </span>
            </p>
            <p>
              You can
              <span class="font-weight-bold"
                >include info about your playlist and activity using special tags enclosed by double
                curly brackets</span
              >, like so <code v-pre>{{ activity.duration }}</code
              >.
            </p>
            <LightboxImg
              :src="require('../assets/template-tutorial-customize-playlist.png')"
              :max-width="600"
            />
            <p class="py-5">
              The above
              <span class="font-weight-bold"
                >double curly bracket tags will be replaced with the playlist and activity
                info</span
              >. Using the example above, when you create a new playlist, its title and description
              will be formatted like so.
            </p>
            <LightboxImg
              :src="require('../assets/template-tutorial-customize-spotify-after.png')"
              :max-width="600"
              class="elevation-5"
            />
            <p class="py-8 ma-0">
              To better see how text was created,
              <span class="font-weight-bold"
                >below is how the text would have looked if it was not formatted</span
              >.
            </p>
            <LightboxImg
              :src="require('../assets/template-tutorial-customize-spotify-before.png')"
              :max-width="600"
              class="elevation-5"
            />

            <h4 class="text-h6 pt-8 pb-4 ma-0">Available tags</h4>
            <v-data-table
              :headers="tagsHeaders"
              :items="tagsItems"
              dense
              hide-default-footer
              :items-per-page="50"
              class="elevation-1"
            >
              <!-- eslint-disable-next-line vue/valid-v-slot -->
              <template #item.tag="{ value }">
                <code>{{ value }}</code>
              </template>
              <!-- eslint-disable-next-line vue/valid-v-slot -->
              <template #item.note="{ value }">
                <template v-if="Array.isArray(value)">
                  <span v-for="row in value" :key="row" class="d-block">{{ row }} </span>
                </template>
                <span v-else>{{ value }}</span>
              </template>
            </v-data-table>

            <h4 class="text-h6 pt-8 pb-4 ma-0">Advanced use</h4>

            <p>
              Templates are formatted using
              <a href="https://handlebarsjs.com/" target="_blank">HandlebarsJS</a>. All built-in
              helpers are available.
            </p>

            <p>
              To display individual tracks, which are in <code v-pre>{{ playlist.tracks }}</code
              >,
              <a href="https://handlebarsjs.com/guide/builtin-helpers.html#each" target="_blank"
                >see how to format lists in HandlebarsJS</a
              >.
            </p>
          </v-col>
        </v-row>
        <v-row class="pb-4">
          <v-col class="text-center">
            <v-btn color="primary" @click="setDialogIsOpen(false)"> Got it! </v-btn>
          </v-col>
        </v-row>
        <v-btn icon class="TemplateHintDialog__dialog-close" @click="setDialogIsOpen(false)"
          ><v-icon>close</v-icon></v-btn
        >
      </v-card>
    </slot>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import useRefRich from '@/modules/utils-reactivity/composables/useRefRich';
import LightboxImg from '@/modules/utils/components/LightboxImg.vue';
import { ProfileRoute } from '../types';

const tagsHeaders = [
  {
    text: 'Name',
    align: 'start',
    sortable: true,
    value: 'name',
  },
  { text: 'Tag', sortable: false, value: 'tag' },
  { text: 'Note', sortable: false, value: 'note' },
];

const tagsItems = [
  {
    name: 'Activity title',
    tag: '{{ activity.title }}',
  },
  {
    name: 'Activity description',
    tag: '{{ activity.description }}',
  },
  {
    name: 'Activity type',
    tag: '{{ activity.type }}',
  },
  {
    name: 'Activity duration',
    tag: '{{ activity.duration }}',
  },
  {
    name: 'Activity date',
    tag: '{{ activity.date }}',
  },
  {
    name: 'Activity URL',
    tag: '{{ activity.url }}',
  },
  {
    name: 'Playlist title',
    tag: '{{ playlist.title }}',
    note: 'Not available in playlist templates',
  },
  {
    name: 'Playlist URL',
    tag: '{{ playlist.url }}',
    note: 'Not available in playlist templates',
  },
  {
    name: 'Playlist tracklist',
    tag: '{{ playlist.tracklist }}',
    note: ['Formatted tracklist.', 'Each track is displayed as "startTime title - artist"'],
  },
  {
    name: 'Playlist tracks',
    tag: '{{ playlist.tracks }}',
    note: [
      'List of playlist tracks.',
      'Each track includes title, album, artist, duration, and startTime',
    ],
  },
  {
    name: 'App name',
    tag: '{{ meta.app }}',
    note: 'Displays "MoovinGroovin"',
  },
];

const TemplateHintDialog = defineComponent({
  name: 'TemplateHintDialog',
  components: {
    LightboxImg,
  },
  inheritAttrs: false,
  setup() {
    const { ref: dialogIsOpen, setter: setDialogIsOpen } = useRefRich({ value: false });

    return {
      dialogIsOpen,
      setDialogIsOpen,
      ProfileRoute,
      tagsHeaders,
      tagsItems,
    };
  },
});

export default TemplateHintDialog;
</script>

<style lang="scss">
@import 'vuetify/src/styles/styles';
.TemplateHintDialog {
  &__dialog {
    max-width: 850px;
  }
  &__dialog-close {
    position: absolute;
    top: 5px;
    right: 5px;
  }
  &__activator {
    margin-top: $spacer;
    margin-bottom: 0;

    .col,
    .v-icon {
      color: var(--v-primary-base) !important;
    }

    &:hover {
      .col,
      .v-icon {
        color: var(--v-primary-darken1) !important;
      }
    }
  }
}
</style>
