<template>
  <v-expansion-panels class="TemplateHint">
    <v-expansion-panel>
      <v-expansion-panel-header class="text-caption mb-0">
        HINT: Using activity and playlist information in templates
      </v-expansion-panel-header>
      <v-expansion-panel-content class="text-caption mb-0">
        <p>To include activity or playlist information in title, use following special tags:</p>
        <p v-pre>
          <code>{{ activity.title }}</code> - Activity title
          <br />
          <code>{{ activity.description }}</code> - Activity description
          <br />
          <code>{{ activity.type }}</code> - Activity type
          <br />
          <code>{{ activity.duration }}</code> - Activity duration
          <br />
          <code>{{ activity.date }}</code> - Activity date
          <br />
          <code>{{ activity.url }}</code> - Activity url
          <br />
          <code>{{ playlist.tracks }}</code> - List of playlist tracks. Each track includes
          <code>name</code>, <code>album</code>, <code>artist</code>, <code>duration</code>,
          <code>startTime</code>. (<a
            href="https://handlebarsjs.com/guide/builtin-helpers.html#each"
            >See how to format lists</a
          >).
          <br />
          <code>{{ playlist.tracklist }}</code> - Formatted tracklist. Tracklist displays each track
          as "startTime name - artist"
          <br />
          <code>{{ playlist.title }}</code> - Activity title (Available only for activity
          description)
          <br />
          <code>{{ playlist.url }}</code> - Activity url (Available only for activity description)
        </p>
        <p>Templates are formatted using <a href="https://handlebarsjs.com/">HandlebarsJS</a>.</p>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

const TemplateHint = defineComponent({
  name: 'TemplateHint',
});

export default TemplateHint;
</script>

<style lang="scss">
.TemplateHint {
}
</style>
