<template>
  <ConfirmDialogGuard
    :confirm-dialog="SaveDialogSmall"
    :open-on-route-leave="hasUnconfirmedChanges"
    :confirm-events="['confirm', 'discard']"
    :pause-navigation="loadingOrWaiting"
    @confirm="onSubmit"
    @discard="onDiscard"
  >
    <v-row class="ProfilePreferences">
      <v-col>
        <ProfileCard>
          <template slot="title">Playlist</template>
          <v-col class="d-flex flex-column">
            <ProfileFormCheckbox
              :input-value="configFormData.playlistPublic"
              @change="(playlistPublic) => updateFormData({ playlistPublic })"
            >
              <template #label> Set new playlists as Public </template>
              <template #label-detail>
                What is a
                <a href="https://support.spotify.com/us/article/set-playlist-privacy/"
                  >public playlist</a
                >?
              </template>
            </ProfileFormCheckbox>

            <ProfileFormCheckbox
              :input-value="configFormData.playlistCollaborative"
              @change="(playlistCollaborative) => updateFormData({ playlistCollaborative })"
            >
              <template #label> Set new playlists as Collaborative </template>
              <template #label-detail>
                What is a
                <a href="https://support.spotify.com/us/article/create-playlists-with-your-friends/"
                  >collaborative playlist</a
                >?
              </template>
            </ProfileFormCheckbox>

            <ProfileFormCheckbox
              :input-value="configFormData.playlistAutoCreate"
              @change="(playlistAutoCreate) => updateFormData({ playlistAutoCreate })"
            >
              <template #label> Automatically create playlist after activity </template>
              <template #label-detail>
                Note: This is the only way to create a playlist for activity currently.
              </template>
            </ProfileFormCheckbox>

            <ProfileFormTextarea
              :value="configFormData.playlistTitleTemplate"
              :default-value="config && config.playlistTitleTemplate"
              :error-messages="formDataErrors.playlistTitleTemplate"
              @input="(playlistTitleTemplate) => updateFormData({ playlistTitleTemplate })"
              @cancel="resetFormData(['playlistTitleTemplate'])"
            >
              <template #checkbox-label> Customize playlist title </template>
              <template #checkbox-label-detail>
                Specify what should go into the playlist title. Title is trimmed to 100 characters
                after formatting.
              </template>
            </ProfileFormTextarea>

            <ProfileFormTextarea
              :value="configFormData.playlistDescriptionTemplate"
              :default-value="config && config.playlistDescriptionTemplate"
              :error-messages="formDataErrors.playlistDescriptionTemplate"
              @input="
                (playlistDescriptionTemplate) => updateFormData({ playlistDescriptionTemplate })
              "
              @cancel="resetFormData(['playlistDescriptionTemplate'])"
            >
              <template #checkbox-label> Customize playlist description </template>
              <template #checkbox-label-detail>
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
            <ProfileFormTextarea
              :checkbox="true"
              :checkbox-input-value="configFormData.activityDescriptionEnabled"
              :value="configFormData.activityDescriptionTemplate"
              :default-value="config && config.activityDescriptionTemplate"
              :error-messages="formDataErrors.activityDescriptionTemplate"
              @input="
                (activityDescriptionTemplate) => updateFormData({ activityDescriptionTemplate })
              "
              @cancel="resetFormData(['activityDescriptionTemplate'])"
              @checkbox-change="
                (activityDescriptionEnabled) => updateFormData({ activityDescriptionEnabled })
              "
            >
              <template #checkbox-label> Customize activity description </template>
              <template #checkbox-label-detail>
                Specify what should go into the activity description.
              </template>
            </ProfileFormTextarea>

            <TemplateHint class="pt-4" />
          </v-col>
        </ProfileCard>

        <ProfileCard>
          <v-col cols="auto">
            <v-btn
              color="primary"
              :disabled="!formIsValid || !hasUnconfirmedChanges"
              @click="onSubmit"
            >
              <slot name="action"> Save changes </slot>
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn color="primary" outlined :disabled="!hasUnconfirmedChanges" @click="onDiscard">
              <slot name="action"> Discard changes </slot>
            </v-btn>
          </v-col>
        </ProfileCard>
      </v-col>
    </v-row>
  </ConfirmDialogGuard>
</template>

<script lang="ts">
import { defineComponent, ref, unref, watch, computed } from '@vue/composition-api';

import validateTemplate from '@/../../moovin-groovin-shared/src/lib/TemplateFormatter/utils/validateTemplate';
import useFormData from '@/modules/utils/composables/useFormData';
import useValidators from '@/modules/utils/composables/useValidators';
import ConfirmDialogGuard from '@/modules/utils/components/ConfirmDialogGuard.vue';
import SaveDialogSmall from '@/modules/utils/components/SaveDialogSmall.vue';
import useCurrentUserConfig, { UserConfig } from '../composables/useCurrentUserConfig';
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
    ConfirmDialogGuard,
  },
  setup() {
    const { config, updateConfig, loading } = useCurrentUserConfig();

    const waitForConfigRefetch = ref(false);

    const loadingOrWaiting = computed(() => unref(loading) || unref(waitForConfigRefetch));

    const {
      formData: configFormData,
      updateFormData,
      resetFormData,
      hasUnconfirmedChanges,
    } = useFormData<UserConfig>({ defaults: config });

    const doValidateTemplate = async (template: string | null | undefined) => {
      if (!template) return;
      const { error } = await validateTemplate(template);
      if (error) return error.message;
    };

    const { isValid: formIsValid, errors: formDataErrors } = useValidators(configFormData, {
      activityDescriptionTemplate: doValidateTemplate,
      playlistTitleTemplate: doValidateTemplate,
      playlistDescriptionTemplate: doValidateTemplate,
    });

    watch(config, (newConfig) => updateFormData({ ...newConfig }), { immediate: true });

    const onSubmit = () => {
      const formData = unref(configFormData);

      const normFormData: Partial<UserConfig> = {
        ...formData,
        playlistCollaborative: Boolean(formData.playlistCollaborative),
        playlistPublic: Boolean(formData.playlistPublic),
        playlistAutoCreate: Boolean(formData.playlistAutoCreate),
        activityDescriptionEnabled: Boolean(formData.activityDescriptionEnabled),
      };

      waitForConfigRefetch.value = true;
      updateConfig({ userConfigInput: formData }).then(() => {
        updateFormData(normFormData);
        waitForConfigRefetch.value = false;
      });
    };

    const onDiscard = () => resetFormData();

    return {
      config,
      configFormData,
      updateFormData,
      resetFormData,
      onSubmit,
      onDiscard,
      hasUnconfirmedChanges,
      loadingOrWaiting,
      SaveDialogSmall,
      formDataErrors,
      formIsValid,
    };
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
