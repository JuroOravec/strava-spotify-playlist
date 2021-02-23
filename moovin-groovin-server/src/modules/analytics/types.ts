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

export interface IdentifyTraits {
  $avatar?: string;
  $email?: string;
  $first_name?: string;
  $last_name?: string;
  $name?: string;
}

/**
 * Interface for `payload` property of `indentify` plugin hook.
 *
 * Values in `traits` object are what we passed to `analytics.identify`.
 * Other values are defined by `analytics` package.
 */
export interface IdentifyPayload {
  userId?: string;
  traits: IdentifyTraits;
}

/**
 * Interface for `payload` property of `track` plugin hook.
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
