import type { VueConstructor } from 'vue';
import * as Sentry from '@sentry/vue';
import { Integrations } from '@sentry/tracing';

const installSentry = (vueClass: VueConstructor): void => {
  Sentry.init({
    Vue: vueClass,
    dsn: 'https://526cea103c074dbc9ca874a644ae2a09@o470159.ingest.sentry.io/5641806',
    integrations: [new Integrations.BrowserTracing()],
    logErrors: true,
    tracesSampleRate: 0.7,
  });
};

export default installSentry;
