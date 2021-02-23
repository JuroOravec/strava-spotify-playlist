<template>
  <ConfirmDialog
    v-bind="$attrs"
    content-class="MembershipBuyDialog"
    v-on="{ ...$listeners, confirm: onConfirmSubmit }"
  >
    <template #activator="{ on, attrs }">
      <slot name="activator" v-bind="{ on, attrs }">
        <v-btn color="primary" v-bind="attrs" v-on="on">
          <slot name="action"> Become Premium Member </slot>
        </v-btn>
      </slot>
    </template>
    <template #dialog-text class="MembershipBuyDialog__body">
      <v-row>
        <v-col class="MembershipBuyDialog__title">
          <v-card-title>
            <h3 class="text-h5 pt-2 px-2">Thank you for your interest</h3>
          </v-card-title>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card-text>
            <p class="text-body-1 font-weight-bold pt-2 px-2">
              The membership features are still in development.
            </p>
            <p class="text-body-1 py-2 px-2">
              Subscribe to receive product updates and have a say in product roadmap.
            </p>
            <v-form data-code="i3l3f1">
              <v-text-field
                type="text"
                autocomplete="name"
                label="Name"
                class="text-body-2"
                aria-label="email"
                aria-required="true"
                filled
                dense
                validate-on-blur
                :error-messages="formDataErrors.name"
                @input="(name) => updateFormData({ name })"
                @blur="updateFormData({ name: $event.target.value })"
              />
              <v-text-field
                id="email"
                type="email"
                autocomplete="email"
                label="Email"
                hint="name@example.com"
                class="text-body-2"
                aria-label="email"
                aria-required="true"
                filled
                dense
                :error-messages="formDataErrors.email"
                @input="(email) => updateFormData({ email })"
                @blur="updateFormData({ email: $event.target.value })"
              />
            </v-form>
          </v-card-text>
        </v-col>
      </v-row>
    </template>
    <template #confirm-action="{ confirm }">
      <v-btn
        class="text-body-1"
        color="primary"
        :disabled="!formIsValid || !isDirty"
        @click="confirm"
      >
        Subscribe
      </v-btn>
    </template>
    <template #cancel-action="{ cancel }">
      <v-btn color="primary" outlined @click="cancel"> Cancel </v-btn>
    </template>
  </ConfirmDialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, unref } from '@vue/composition-api';
import * as Sentry from '@sentry/vue';

import ConfirmDialog from '@/modules/utils/components/ConfirmDialog.vue';
import useAnalytics from '@/plugins/analytics/composables/useAnalytics';
import useFormData from '@/modules/utils/composables/useFormData';
import useValidators from '@/modules/utils/composables/useValidators';
import * as validators from '@/modules/utils/utils/validators';
import useListeners from '@/modules/utils/composables/useListeners';

const MembershipBuyDialog = defineComponent({
  name: 'MembershipBuyDialog',
  components: {
    ConfirmDialog,
  },
  inheritAttrs: false,
  setup(_, { emit }) {
    const { trackEvent } = useAnalytics();

    const { interceptEvent } = useListeners({ emit });

    const {
      formData: signupFormData,
      formDataSerialized: serializedSignupFormData,
      updateFormData,
      isDirty,
    } = useFormData<
      {
        name: string;
        email: string;
      },
      { 'fields[email]': string; 'fields[name]': string }
    >({
      defaults: { name: undefined, email: undefined },
      serializer: (data) => ({ 'fields[email]': data.email, 'fields[name]': data.name }),
    });

    const { isValid: formIsValid, errors: formDataErrors } = useValidators(signupFormData, {
      name: [validators.required],
      email: [validators.required, validators.email],
    });

    onMounted(() => trackEvent('membership_interest'));

    const onConfirmSubmit = interceptEvent('confirm', () => {
      const formData = new FormData();
      Object.entries(unref(serializedSignupFormData)).forEach(([key, val]) =>
        formData.set(key, val ?? '')
      );
      // Not sure if these 2 are required, but they are on the singup form by ML
      formData.set('ml-submit', '1');
      formData.set('anticsrf', 'true');

      fetch('https://static.mailerlite.com/webforms/submit/i3l3f1', {
        method: 'POST',
        body: formData,
      }).catch((err) => {
        if (!err) return;
        console.error(err);
        Sentry.captureException(err);
      });
    });

    return {
      formIsValid,
      isDirty,
      formDataErrors,
      updateFormData,
      onConfirmSubmit,
    };
  },
});

export default MembershipBuyDialog;
</script>

<style lang="scss">
@import '~vuetify/src/styles/main';
.MembershipBuyDialog {
  max-width: 700px;
  overflow: visible;

  &__title {
    text-align: center;

    .v-card__title {
      justify-content: center;
    }
  }

  .row {
    justify-content: center;
    text-align: center;
  }

  .v-input {
    &.v-text-field {
      max-width: 350px;
      margin: auto;
    }

    .v-label {
      @extend .text-body-2;
    }
  }
}
</style>
