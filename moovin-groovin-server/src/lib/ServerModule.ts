import { EventEmitter } from 'events';
import {
  Application,
  NextFunction,
  Request,
  Response,
  RouterOptions,
} from 'express';
import http from 'http';
import { Strategy } from 'passport';

import type { OptionalArray } from '../../../moovin-groovin-shared/src/types/optionals';
import isRouter from '../modules/router/utils/isRouter';
import type { RouterInputBase } from '../modules/router/types';
import type { OpenApiSpecInputBase } from '../modules/openapi/types';
import type { GraphqlApolloConfigInputBase } from '../modules/graphql/types';
import getProps from '../utils/props';
import logger from './logger';

type AnyServerModule = ServerModule<any, any, any, any>;
type ServerModules = Record<string, AnyServerModule>;

interface ModuleContext<TModules extends ServerModules = ServerModules> {
  app: Application;
  server?: http.Server;
  addContextProp: (key: string, val: unknown) => void;
  modules: TModules;
}

type Installer<T extends ServerModules = ServerModules> = (
  ctx: ModuleContext<T>
) => void;
type Closer = () => void | Promise<any>;
type Services = Record<string, (this: AnyServerModule, ...args: any[]) => any>;
type Handlers = Record<
  string,
  (
    this: AnyServerModule,
    req: Request<any, any, any, any>,
    res: Response,
    next: NextFunction
  ) => any
>;
type Data = Record<string, any>;

type RouterCreator = (
  routerOptions?: RouterOptions
) => OptionalArray<RouterInputBase> | undefined;
type OAuthCreator = (oauthOptions: {
  callbackUrl: string;
}) => Strategy | undefined;
type GraphqlCreator = () =>
  | OptionalArray<GraphqlApolloConfigInputBase>
  | undefined;
type OpenApiCreator = () => OptionalArray<OpenApiSpecInputBase> | undefined;

type ListenerStopHandle = () => void;
/** [EventName, EventPayload] */
type EventEmits = [string, any[]];
type TupleToEmitter<T extends [string, any[]]> = {
  [Key in T[0]]: (event: Key, ...payload: Extract<T, [Key, any[]]>[1]) => void;
};
type TupleToListener<T extends [string, any[]]> = {
  [Key in T[0]]: (
    event: Key,
    listener: (...payload: Extract<T, [Key, any[]]>[1]) => void
  ) => ListenerStopHandle;
};

interface ServerModuleOptions<
  TServices extends Services = Services,
  THandlers extends Handlers = Handlers,
  TData extends Data = Data,
  TModules extends ServerModules = ServerModules
> {
  /** Unique identifier for the module. */
  name: string;
  /** Function that receives ModuleContext and does install / setup logic */
  install?: Installer<TModules>;
  /** Function that shuts down dependencies created by the module */
  close?: Closer;
  /** Methods that are available to other module members */
  services?: TServices | (() => TServices);
  /** Handlers that process routes defined by this module */
  handlers?: THandlers | (() => THandlers);
  /** Arbitrary data held by this module that are available to other members */
  data?: TData | (() => TData);
  /** Function that receives Express Router options and optionally creates Express Router instance */
  router?: OptionalArray<RouterInputBase> | RouterCreator;
  openapi?: OptionalArray<OpenApiSpecInputBase> | OpenApiCreator;
  oauth?: OAuthCreator;
  graphql?: OptionalArray<GraphqlApolloConfigInputBase> | GraphqlCreator;
  [key: string]: unknown;
}

/** Call `.bind(newThis)` on every function on the obj. Returns copy of the object */
const bindObjectProps = <T>(
  obj: T,
  newThis: any,
  skip: (keyof T)[] = []
): T => {
  if (!obj) return obj;

  return getProps(obj, {
    ignorePrototypes: [Object.getPrototypeOf({})],
  }).reduce((aggObj, key) => {
    const val = (obj as any)[key];

    const shouldBindValue =
      typeof val === 'function' && !skip.includes(key as keyof T);

    (aggObj as any)[key] = shouldBindValue ? val.bind(newThis) : val;

    return aggObj;
  }, {} as T);
};

const isPromise = (val: any): val is Pick<Promise<any>, 'then'> =>
  typeof val?.then === 'function';

/**
 * Function wrapper. Emits an event before and after the wrapped function is called.
 * Emitted event includes args passed to the function.
 */
const wrapInEmit = <T extends (...args: any[]) => any>(
  fn: T,
  emitter: { emit: (...args: any[]) => any },
  events: { before?: string; after?: string }
): T => {
  const wrapper = ((...args) => {
    events.before && emitter.emit(events.before, ...args);
    const res = fn?.(...args);
    if (events.after) {
      if (isPromise(res)) {
        res.then((...resultArgs) => emitter.emit(events.after, ...resultArgs));
      } else {
        emitter.emit(events.after, res);
      }
    }
    return res;
  }) as T;
  return wrapper;
};

/**
 * Get value. If value is function, we assume it's an initializer that returns value.
 * We call initializer context as this
 */
const initializeValue = <TValue, TContext>(
  value: TValue | ((this: TContext) => TValue),
  context: TContext
): TValue =>
  typeof value === 'function'
    ? (value as (this: TContext) => TValue).call(context)
    : value;

class ServerModule<
  TServices extends Services = Services,
  THandlers extends Handlers = Handlers,
  TData extends Data = Data,
  TModules extends ServerModules = ServerModules,
  TEventEmits extends EventEmits = EventEmits
> {
  /** Unique identifier for the module. */
  name: string;
  /** Function that receives ModuleContext and does install / setup logic */
  install: Installer<TModules>;
  /** Function that shuts down dependencies created by the module */
  close: Closer;
  /** Handlers that process routes defined by this module */
  handlers: THandlers;
  /** Methods that are available to other module members */
  services: TServices;
  /** Arbitrary data held by this module that are available to other members */
  data: TData;
  /** Context where the ServerModule appears. `null` before the module is installed */
  context: ModuleContext<TModules> | null = null;
  /** Function that receives Express Router options and optionally creates Express Router instance */
  router: RouterCreator;
  openapi: OpenApiCreator;
  oauth: OAuthCreator;
  graphql: GraphqlCreator;

  private emitter: EventEmitter = new EventEmitter();

  constructor(options: ServerModuleOptions<TServices, THandlers, TData>) {
    const {
      name,
      install = (() => {}) as Installer<TModules>,
      close = () => {},
      services = {} as TServices,
      handlers = {} as THandlers,
      data = {} as TData,
      router = (() => {}) as RouterCreator,
      oauth = (() => {}) as OAuthCreator,
      graphql = (() => {}) as GraphqlCreator,
      openapi = (() => {}) as OpenApiCreator,
    } = options;

    this.name = name;

    // Base functionality
    const installer: Installer<TModules> = wrapInEmit(
      install.bind(this),
      this,
      { before: `${name}:willInstall`, after: `${name}:didInstall` }
    );
    const closer = wrapInEmit(close.bind(this), this, {
      before: `${name}:willClose`,
      after: `${name}:didClose`,
    });

    this.install = (ctx) => {
      // Capture the context on install
      this.context = ctx;
      return installer(ctx);
    };
    this.close = async () => {
      // Release the context on close
      await closer();
      this.context = null;
      this.emitter.removeAllListeners();
    };

    this.services = bindObjectProps(initializeValue(services, this), this);
    this.handlers = bindObjectProps(initializeValue(handlers, this), this);
    this.data = bindObjectProps(initializeValue(data, this), this);

    // Extended functionalities
    const routerCreator =
      typeof router === 'function'
        ? isRouter(router)
          ? () => router
          : router
        : () => router;
    this.router = wrapInEmit(routerCreator.bind(this), this, {
      before: `${name}:willCreateRouter`,
      after: `${name}:didCreateRouter`,
    });

    this.oauth = wrapInEmit(oauth.bind(this), this, {
      before: `${name}:willCreateOAuth`,
      after: `${name}:didCreateOAuth`,
    });

    const graphqlCreator =
      typeof graphql === 'function' ? graphql : () => graphql;
    this.graphql = wrapInEmit(graphqlCreator.bind(this), this, {
      before: `${name}:willCreateGraphql`,
      after: `${name}:didCreateGraphql`,
    });

    const openapiCreator =
      typeof openapi === 'function' ? openapi : () => openapi;
    this.openapi = wrapInEmit(openapiCreator.bind(this), this, {
      before: `${name}:willCreateOpenAPI`,
      after: `${name}:didCreateOpenAPI`,
    });
  }

  emit<T extends TupleToEmitter<TEventEmits>, K extends keyof T>(
    ...[event, ...args]: Parameters<T[K]>
  ): void {
    logger.debug(`Emitting event "${event.toString()}" from "${this.name}"`);
    this.emitter.emit(event as string, ...args);
  }

  on<
    T extends TupleToListener<TEventEmits>,
    K extends keyof T,
    LArgs extends Parameters<Parameters<T[K]>[1]>
  >(event: K, listener: (...args: LArgs) => void): ListenerStopHandle {
    this.emitter.on(event as string, listener as any);
    const stopHandle = () => {
      this.emitter.off(event as string, listener as any);
    };
    return stopHandle;
  }

  once<
    T extends TupleToListener<TEventEmits>,
    K extends keyof T,
    LArgs extends Parameters<Parameters<T[K]>[1]>
  >(event: K, listener: (...args: LArgs) => void): ListenerStopHandle {
    const stopHandle = this.on(event as any, (...args) => {
      listener(...(args as LArgs));
      stopHandle();
    });
    return stopHandle;
  }
}

function assertContext(
  context: ModuleContext | null,
  callee?: string
): asserts context {
  if (context) return;

  let errorMessage =
    'Tried to access server module context before the module was installed.';
  if (callee) {
    errorMessage += ` (accessed from "${callee}")`;
  }

  throw Error(errorMessage);
}

export default ServerModule;
export { assertContext };
export type {
  ServerModule,
  AnyServerModule,
  ModuleContext,
  ServerModuleOptions,
  Installer,
  Closer,
  Services,
  Handlers,
  Data,
  ServerModules,
  RouterCreator,
  OAuthCreator,
  OpenApiCreator,
  GraphqlCreator,
};
