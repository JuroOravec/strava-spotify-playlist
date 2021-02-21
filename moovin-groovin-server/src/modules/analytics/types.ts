import type { Analytics, AnalyticsInstance } from 'analytics';

export type AnalyticsOptions = Parameters<typeof Analytics>[0];

export interface ContextPlugin<TConfig extends any = any> {
  config: TConfig;
  enabled: true;
  initialized: false;
  loaded: false;
}

/** Context available inside plugin hooks */
export interface AnalyticsPluginContext<
  P extends any = any,
  C extends any = any,
  /* eslint-disable-next-line @typescript-eslint/ban-types */
  TPlugins extends object = Record<string, ContextPlugin<any>>
> {
  abort: () => void;
  config: C;
  hello: string;
  instance: AnalyticsInstance;
  payload: P;
  plugins: TPlugins;
}
