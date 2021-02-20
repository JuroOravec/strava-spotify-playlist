import type Vue from 'vue';
import type { Analytics, AnalyticsInstance } from 'analytics';

export type { AnalyticsInstance } from 'analytics';

export type AnalyticsConfig = Parameters<typeof Analytics>[0];

/** Info on other plugins available inside plugin hooks */
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

// Extend Vue type with analytics prop
declare module 'vue/types/options' {
  export interface ComponentOptions<
    V extends Vue,
    /* eslint-disable @typescript-eslint/no-unused-vars */
    Data = DefaultData<V>,
    Methods = DefaultMethods<V>,
    Computed = DefaultComputed,
    PropsDef = PropsDefinition<DefaultProps>,
    Props = DefaultProps
    /* eslint-enable @typescript-eslint/no-unused-vars */
  > {
    analytics?: AnalyticsInstance;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $analytics: AnalyticsInstance;
  }
}
