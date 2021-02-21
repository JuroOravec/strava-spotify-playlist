import mixpanel, { Mixpanel } from 'mixpanel';
import type { AnalyticsPlugin } from 'analytics';
import { v4 as genUuid } from 'uuid';

import type {
  AnalyticsPluginContext,
  ContextPlugin,
  IdentifyPayload,
  TrackPayload,
} from '../types';

export interface MixpanelPluginConfig extends Mixpanel.Config {
  token: string;
}

export type MixpanelPlugin<T extends string = string> = Omit<
  AnalyticsPlugin<T>,
  'config'
> & {
  config: MixpanelPluginConfig;
};

interface Plugins {
  mixpanel: ContextPlugin<MixpanelPluginConfig>;
}

type PluginContext<TPayload extends any = any> = AnalyticsPluginContext<
  TPayload,
  null,
  Plugins
>;

/**
 * Mixpanel analytics plugin used in place of @analytics/mixpanel, which is
 * is noop in NodeJS. Plugin hooks taken from the browser version of @analytics/mixpanel.
 */
const createMixpanelPlugin = (
  options: MixpanelPluginConfig
): MixpanelPlugin => {
  let mixpanelInstance: Mixpanel | null = null;

  return {
    name: 'mixpanel',
    config: options,

    // Hook triggered on initialization
    initialize({ plugins }: PluginContext) {
      const { token, ...mixpanelConfig } = plugins.mixpanel.config;
      mixpanelInstance = mixpanel.init(token, mixpanelConfig);
    },

    /**
     * Identify a visitor in mixpanel
     * @link https://developer.mixpanel.com/docs/javascript-full-api-reference#mixpanelidentify
     *
     * Note: Unlike in frontend, here we use `identify` to **identify user for the first time using
     * `alias`**. If you need to distinguish between `alias` (first-time identification) vs `identify`
     * (subsequent identification), split this function into two.
     *
     * Mixpanel doesn't allow to set properties directly in identify, so mixpanel.people.set is
     * also called if properties are passed
     */
    async identify({ payload }: PluginContext<IdentifyPayload>) {
      const { userId, traits } = payload;

      if (!userId) return;

      const distinctId = genUuid();
      await new Promise<void>((res, rej) =>
        mixpanelInstance?.alias(distinctId, userId, (err) =>
          err ? rej(err) : res()
        )
      );

      if (!traits) return;

      await new Promise<void>((res, rej) =>
        mixpanelInstance?.people.set(distinctId, traits, (err) =>
          err ? rej(err) : res()
        )
      );
    },

    /* https://developer.mixpanel.com/docs/javascript-full-api-reference#mixpaneltrack */
    track({ payload }: PluginContext<TrackPayload>) {
      mixpanel.track(payload.event, payload.properties);
    },

    loaded() {
      return Boolean(mixpanelInstance);
    },
  };
};

export default createMixpanelPlugin;
