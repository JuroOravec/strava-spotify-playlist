import type Vue from 'vue';
import type { Analytics, AnalyticsInstance } from 'analytics';
import type VueRouter from 'vue-router';

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

export interface PageProperties {
  /** Resolved route. Custom property passed to `analytics.page` */
  to?: ReturnType<VueRouter['resolve']>;
  /** Resolved route. Custom property passed to `analytics.page` */
  from?: ReturnType<VueRouter['resolve']>;
}

/**
 * Interface for `payload` property of `page` hook.
 *
 * Values in `properties` object are a union of what we passed to `analytics.page`
 * and what is included out-of-the-box.
 *
 * Other values are defined by `analytics` package.
 */
export interface PagePayload {
  properties: PageProperties;
}

export interface IdentifyTraits {
  $avatar?: string;
  $email?: string;
  $first_name?: string;
  $last_name?: string;
  $name?: string;
}

/**
 * Interface for `payload` property of `indentify` hook.
 *
 * Values in `traits` object are what we passed to `analytics.identify`.
 * Other values are defined by `analytics` package.
 */
export interface IdentifyPayload {
  userId?: string;
  traits: IdentifyTraits;
}

/**
 * Interface for `payload` property of `track` hook.
 *
 * Values in `properties` object are a union of what we passed to `analytics.track`
 * and what is included out-of-the-box.
 *
 * Other values are defined by `analytics` package.
 */
export interface TrackPayload<T extends any = any> {
  anonymousId: string;
  userId: string;
  event: string;
  meta: {
    timestamp: number;
    callback: () => any;
  };
  options: any;
  properties: T;
  type: string;
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
