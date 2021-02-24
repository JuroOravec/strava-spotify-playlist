<template>
  <v-alert
    v-model="isAlertActive"
    tile
    v-bind="$attrs"
    class="ConsentAlert elevation-5"
    v-on="$listeners"
  >
    <v-card-title> This site uses third party services. </v-card-title>
    <v-card-subtitle>
      By allowing these third party services, you accept their cookies and the use of tracking
      technologies necessary for their proper functioning.
    </v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col class="col-auto">
          <!-- TODO: Implement this -->
          <!-- <ConfirmDialog>
            <template #activator="{ on, attrs }">
              <v-btn color="primary" text v-bind="attrs" v-on="on">
                <slot name="confirm-text">Customize</slot>
              </v-btn>
            </template>
          </ConfirmDialog> -->
        </v-col>
        <v-spacer />
        <v-col class="col-auto">
          <v-btn color="primary" outlined @click="disableAll">
            <slot name="cancel-text">Reject all</slot>
          </v-btn>
        </v-col>
        <v-col class="col-auto">
          <v-btn color="primary" @click="enableAll">
            <slot name="confirm-text">Accept all</slot>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-alert>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api';
import * as Sentry from '@sentry/vue';
import noop from 'lodash/noop';

import useRefRich from '@/modules/utils-reactivity/composables/useRefRich';
import useAnalytics from '@/plugins/analytics/composables/useAnalytics';
import { OptionalPromise } from '@moovin-groovin/shared';

interface ConsentPartner {
  id: string;
  name: string;
  description: string;
  enable: () => OptionalPromise<void>;
  disable: () => OptionalPromise<void>;
}

// TODO: Add purposes, and features, as can be seen in examples below
//  - https://www.csoonline.com/article/3202771/general-data-protection-regulation-gdpr-requirements-deadlines-and-facts.html
//  - https://www.theguardian.com/uk
const createConsentPartners = (): ConsentPartner[] => {
  const { analytics } = useAnalytics();

  return [
    {
      id: 'sentry',
      name: 'Sentry',
      description:
        'Error monitoring that helps software teams discover, triage, and prioritize errors in real-time.',
      enable: () => {
        // https://github.com/getsentry/sentry-javascript/issues/2039#issuecomment-486674574
        const clientOptions = Sentry.getCurrentHub().getClient()?.getOptions() ?? {};
        clientOptions.enabled = true;
      },
      disable: () => {
        const clientOptions = Sentry.getCurrentHub().getClient()?.getOptions() ?? {};
        clientOptions.enabled = false;
      },
    },
    {
      id: 'mixpanel',
      name: 'Mixpanel',
      description:
        'User interaction tracking for web and mobile applications. Data collected is used to inform product roadmap, and measure user engagement and retention.',
      enable: () => analytics?.plugins.enable('mixpanel' as any, noop),
      disable: () => analytics?.plugins.enable('mixpanel' as any, noop),
    },
  ];
};

const ConsentAlert = defineComponent({
  name: 'ConsentAlert',
  inheritAttrs: false,
  setup() {
    const { ref: isAlertActive, setter: setIsAlertActive } = useRefRich({ value: true });

    const consentPartners = createConsentPartners();

    const storeConsent = (consentGiven: boolean) =>
      localStorage.setItem('moovin-groovin-consent', JSON.stringify(!!consentGiven));

    const getConsent = (): any =>
      JSON.parse(localStorage.getItem('moovin-groovin-consent') ?? 'null');

    const disableAll = async () => {
      setIsAlertActive(false);
      await Promise.all(consentPartners.map((partner) => partner.disable()));
      storeConsent(false);
    };

    const enableAll = async () => {
      setIsAlertActive(false);
      storeConsent(true);
      await Promise.all(consentPartners.map((partner) => partner.enable()));
    };

    onMounted(() => {
      const consent = getConsent();
      if (consent || consent === false) {
        consent ? enableAll() : disableAll();
        setIsAlertActive(false);
        return;
      }
      setIsAlertActive(true);
    });

    return {
      isAlertActive,
      disableAll,
      enableAll,
    };
  },
});

export default ConsentAlert;
</script>

<style lang="scss">
.ConsentAlert {
  position: fixed;
  bottom: 0;
  z-index: 1000;
}
</style>
