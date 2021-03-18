import mixpanel from 'mixpanel-browser';
import type { AnalyticsPlugin } from 'analytics';

import type { MixpanelPluginConfig } from './mixpanelPlugin';
import type {
  AnalyticsPluginContext,
  ContextPlugin,
  IdentifyPayload,
  PagePayload,
  TrackPayload,
} from '../types';

interface Plugins {
  mixpanel: ContextPlugin<MixpanelPluginConfig>;
}

type PluginContext<TPayload extends any = any> = AnalyticsPluginContext<TPayload, null, Plugins>;

/**
 * Plugin that transforms the data from the client to Mixpanel.
 *
 * The plugin is used in `analytics` instance. The plugin defines hooks
 * that intercept the data (passed from `analytics` instance) before they
 * reach the Mixpanel instance (which then sends the data to Mixpanel server).
 *
 * All hooks receive a context object as the first argument. The context object
 * has multiple properties.
 *
 * Payload
 *
 * The most relevant context property to us is `payload` property. It's an object
 * that contains the data we've passed to `analytics` instance (e.g. when we call
 * `analytics.track('MyEvent', { some: properties })`).
 *
 * In most hooks, the `payload` object is what is used downstream (e.g. when tracking
 * an event, `payload.event` is the event name tracked, and `payload.properties` are
 * the event properties tracked.
 *
 * The hooks can _optionally_ return an object. If they do so, the object is merged
 * with the `payload` object. If they do not, the `payload` object is used downstream
 * The payload object passed to the hook is the same object _reference_ as what's used
 * downstream. This means that if you need to remove or modify properties on the payload,
 * it's sufficient to delete / overwrite those properties.
 *
 * Abort
 *
 * Hooks also receive an `abort` property on the context object. `abort` is a function
 * which can be called and returned from the hook. If done so, the flow is cancelled
 * and the hooks that should have been called after this one will not be called.
 *
 * Example: If we want to abort tracking some events, we can call `abort`
 * in `track:mixpanel`. This will prevent the `track` hook on `mixpanel` plugin
 * from being called, which effectively prevents the event from being tracked to mixpanel.
 *
 * See https://github.com/DavidWells/analytics for details.
 */
const transformMixpanelPlugin = (): AnalyticsPlugin => {
  return {
    name: transformMixpanelPlugin.name,
    config: null,

    // Hook triggered on initialization
    // Since we're including Mixpanel package, we instantiate it ourselves.
    // This avoids @analytics/mixpanel making a request to Mixpanel's CDN, which is
    // unnecessary since we already include the package via npm.
    'initialize:mixpanel'({ plugins }: PluginContext) {
      const { token, ...mixpanelConfig } = plugins.mixpanel.config;
      mixpanel.init(token, mixpanelConfig);

      // Set mixpanel to window so @analytics/mixpanel won't load it
      (window as any).mixpanel = mixpanel;
    },

    // Hook triggered on when mixpanel is loaded
    ready(/* ctx: PluginContext */) {
      // Setup event super properties
      // mixpanel.register({ key: val });
    },

    // Hook triggered on analytics.page
    // Updates Event Super Properties with new route data
    'page:mixpanel'({ payload, abort }: PluginContext<PagePayload>) {
      const { to } = payload.properties;
      if (!to) return abort();

      const pageProps = {
        page_name: to.location.name,
        url_full: `${window.location.origin}${to.href}`,
        url: `${window.location.origin}${to.location.path}`,
      };

      mixpanel.register(pageProps);

      // Purge props that we don't want to track
      payload.properties = {};

      // Mixpanel doesn't have a method for page events, so we use `mixpanel.track`
      // to track the page visit. Plus, @analytics/mixpanel's page hook is very
      // inflexible, so we abort.
      mixpanel.track('page', payload.properties);
      return abort();
    },

    // Hook triggered on analytics.identify
    'identify:mixpanel'({ payload }: PluginContext<IdentifyPayload>) {
      const { userId } = payload;

      if (userId) {
        mixpanel.alias(userId);
      }
    },

    // Hook triggered on analytics.track
    'track:mixpanel'({ payload, abort }: PluginContext<TrackPayload>) {
      // Handle the payload differently based on the event
      // switch (payload.event) {
      //   case Events.LOGIN: {
      //     // Update user property that counts logins
      //     mixpanel.people.increment(traitName(UserProps.TIMES_LOGGED_IN_EE));
      //     // Clear properties
      //     payload.properties = {};
      //     return;
      //   }
      //   case Events.LOGOUT: {
      //     // Clear properties
      //     payload.properties = {};
      //     return;
      //   }
      //   case Events.PROGRAM: {
      //     // Include the Program name in events if the program name changes.
      //     // Note: In Mixpanel, registering properties means that those properties are copied
      //     // to every subsequent event tracked.
      //     // See https://help.mixpanel.com/hc/en-us/articles/360001355266-Event-Properties#super-properties-for-events.
      //     mixpanel.register({
      //       [propName(EventProps.DEPLOYMENT_PROGRAM)]: payload.properties.name || 'Null',
      //     });
      //     // We want to attach the program properties to subsequent events, but we're not
      //     // particularly interested in tracking the program data as a separate event.
      //     // So we prevent tracking of this event by calling and returning abort.
      //     return abort();
      //   }
      //   default:
      //     return;
      // }
    },
  };
};

export default transformMixpanelPlugin;
