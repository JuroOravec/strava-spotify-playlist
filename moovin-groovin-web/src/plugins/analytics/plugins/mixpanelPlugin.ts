import type { Config } from 'mixpanel-browser';
import type { AnalyticsPlugin } from 'analytics';
// @ts-ignore
import mixpanelPlugin from '@analytics/mixpanel';

export interface MixpanelPluginConfig extends Partial<Config> {
  token: string;
}

export type MixpanelPlugin<T extends string = string> = Omit<AnalyticsPlugin<T>, 'config'> & {
  config: MixpanelPluginConfig;
};

const createMixpanelPlugin = (options: MixpanelPluginConfig): MixpanelPlugin =>
  mixpanelPlugin(options);

export default createMixpanelPlugin;
