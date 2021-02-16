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
          <ProfileFormSubmit
            :submit-disabled="!formIsValid || !hasUnconfirmedChanges || updateInProgress"
            :discard-disabled="!hasUnconfirmedChanges || updateInProgress"
            :submit-is-loading="updateInProgress"
            @submit="onSubmit"
            @discard="onDiscard"
          />
        </ProfileCard>

        <ProfileCard>
          <template slot="title">Playlist</template>
          <v-col class="d-flex flex-column">
            <ProfileFormCheckbox
              :input-value="configFormData.playlistPublic"
              :disabled="updateInProgress"
              @change="(playlistPublic) => updateFormData({ playlistPublic })"
            >
              <template #label> Set new playlists as Public </template>
              <template #label-detail>
                What is a
                <a
                  href="https://support.spotify.com/us/article/set-playlist-privacy/"
                  target="_blank"
                  >public playlist</a
                >?
              </template>
            </ProfileFormCheckbox>

            <ProfileFormCheckbox
              :input-value="configFormData.playlistCollaborative"
              :disabled="updateInProgress"
              @change="(playlistCollaborative) => updateFormData({ playlistCollaborative })"
            >
              <template #label> Set new playlists as Collaborative </template>
              <template #label-detail>
                What is a
                <a
                  href="https://support.spotify.com/us/article/create-playlists-with-your-friends/"
                  target="_blank"
                  >collaborative playlist</a
                >?
              </template>
            </ProfileFormCheckbox>

            <ProfileFormCheckbox
              :input-value="configFormData.playlistAutoCreate"
              :disabled="updateInProgress"
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
              :disabled="updateInProgress"
              @input="(playlistTitleTemplate) => updateFormData({ playlistTitleTemplate })"
              @cancel="resetFormData(['playlistTitleTemplate'])"
            >
              <template #checkbox-label> Customize playlist title </template>
              <template #checkbox-label-detail>
                Specify what should go into the playlist title. Title is trimmed to 100 characters
                after formatting.
                <TemplateHintDialog />
              </template>
            </ProfileFormTextarea>

            <ProfileFormTextarea
              :value="configFormData.playlistDescriptionTemplate"
              :default-value="config && config.playlistDescriptionTemplate"
              :error-messages="formDataErrors.playlistDescriptionTemplate"
              :disabled="updateInProgress"
              @input="
                (playlistDescriptionTemplate) => updateFormData({ playlistDescriptionTemplate })
              "
              @cancel="resetFormData(['playlistDescriptionTemplate'])"
            >
              <template #checkbox-label> Customize playlist description </template>
              <template #checkbox-label-detail>
                Specify what should go into the playlist description. Description is trimmed to 300
                characters after formatting.
                <TemplateHintDialog />
              </template>
            </ProfileFormTextarea>
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
              :disabled="updateInProgress"
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
                <TemplateHintDialog />
              </template>
            </ProfileFormTextarea>
          </v-col>
        </ProfileCard>

        <ProfileCard>
          <ProfileFormSubmit
            :submit-disabled="!formIsValid || !hasUnconfirmedChanges || updateInProgress"
            :discard-disabled="!hasUnconfirmedChanges || updateInProgress"
            :submit-is-loading="updateInProgress"
            :disabled="updateInProgress"
            @submit="onSubmit"
            @discard="onDiscard"
          />
        </ProfileCard>
      </v-col>
    </v-row>
  </ConfirmDialogGuard>
</template>

<script lang="ts">
import { defineComponent, unref, watch, computed } from '@vue/composition-api';

import validateTemplate from '@moovin-groovin/shared/src/lib/TemplateFormatter/utils/validateTemplate';
import useFormData from '@/modules/utils/composables/useFormData';
import useValidators from '@/modules/utils/composables/useValidators';
import ConfirmDialogGuard from '@/modules/utils/components/ConfirmDialogGuard.vue';
import SaveDialogSmall from '@/modules/utils/components/SaveDialogSmall.vue';
import useCurrentUserConfig, { UserConfig } from '../composables/useCurrentUserConfig';
import ProfileCard from './ProfileCard.vue';
import TemplateHintDialog from './TemplateHintDialog.vue';
import ProfileFormCheckbox from './ProfileFormCheckbox.vue';
import ProfileFormTextarea from './ProfileFormTextarea.vue';
import ProfileFormSubmit from './ProfileFormSubmit.vue';

const ProfilePreferences = defineComponent({
  name: 'ProfilePreferences',
  components: {
    ProfileCard,
    ProfileFormCheckbox,
    ProfileFormTextarea,
    ProfileFormSubmit,
    TemplateHintDialog,
    ConfirmDialogGuard,
  },
  setup() {
    const {
      config,
      updateConfig,
      loading,
      loadingUpdate: updateInProgress,
    } = useCurrentUserConfig();

    const loadingOrWaiting = computed(() => unref(loading));

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

      updateConfig({ userConfigInput: formData }).then(() => {
        updateFormData(normFormData);
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
      updateInProgress,
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
  .ProfileFormTextarea .v-textarea {
    @extend .pt-2;
  }
}
</style>
