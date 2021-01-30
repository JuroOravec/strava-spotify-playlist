import express, { Application } from 'express';
import http from 'http';
import os from 'os';
import fromPairs from 'lodash/fromPairs';

import destructurable from '../utils/destructurable';
import logger from './logger';
import ServerModule, {
  AnyServerModule,
  ModuleContext,
  Installer,
  ServerModuleOptions,
  Closer,
} from './ServerModule';

interface ContextProps {
  [prop: string]: any;
}

interface ServerContextOptions {
  name: string;
  app?: Application;
  modules?: (ServerModuleOptions | AnyServerModule)[];
}

const makeContext = (context: ServerContext): ModuleContext & ContextProps => {
  const exposedProps: (keyof ServerContext)[] = [
    'app',
    'server',
    'addContextProp',
    'modules',
  ];

  const { app, server, addContextProp, modules } = destructurable(context, {
    props: exposedProps,
  });

  return {
    app,
    server,
    addContextProp: (key: string, val: unknown) => {
      addContextProp(key, val, { reservedProps: exposedProps });
    },
    modules: { ...modules },
  };
};

const normalizeServerModules = (
  modules: (AnyServerModule | ServerModuleOptions)[]
): AnyServerModule[] => {
  const seenModules = new Set<string>();

  return modules.map((serverModule) => {
    if (!serverModule.name) {
      throw Error('Server module must have a name');
    }

    if (seenModules.has(serverModule.name)) {
      throw Error(
        `Server module with name "${serverModule.name}" already exists`
      );
    }

    seenModules.add(serverModule.name);

    return serverModule instanceof ServerModule
      ? serverModule
      : new ServerModule(serverModule);
  });
};

class ServerContext {
  name: string;
  app: Application;
  server?: http.Server;
  modules: { [key: string]: AnyServerModule } = {};
  contextProps: ContextProps = {};
  private isClosing = false;

  constructor(options: ServerContextOptions) {
    const { name, app = express(), modules = [] } = options;

    this.name = name;
    this.app = app;

    const normModules = normalizeServerModules(modules);

    this.modules = fromPairs(normModules.map((mod) => [mod.name, mod])) ?? {};
  }

  /**
   * Call installer function of a specific ServerModule or directly.
   */
  async installModule(
    installerOrModule: Installer | AnyServerModule
  ): Promise<ServerContext> {
    const ctx = makeContext(this);

    const installer =
      installerOrModule instanceof ServerModule
        ? installerOrModule.install
        : installerOrModule;

    await installer?.(ctx);
    return this;
  }

  /**
   * Calls installer functions of all modules.
   */
  async install(): Promise<ServerContext> {
    // Install modules one by one
    await Object.values(this.modules).reduce(async (aggPromise, mod) => {
      await aggPromise;
      logger.info(`Installing server module ${mod.name}`);
      await this.installModule(mod);
      logger.info(`Done installing server module ${mod.name}`);
    }, Promise.resolve());
    return this;
  }

  /**
   * Call closer function of a specific ServerModule or directly.
   */
  async closeModule(
    closerOrModule: Closer | AnyServerModule
  ): Promise<ServerContext> {
    const closer =
      closerOrModule instanceof ServerModule
        ? closerOrModule.close
        : closerOrModule;

    await closer?.();
    return this;
  }

  /**
   * Calls closer functions of all modules.
   */
  async close(): Promise<void> {
    this.isClosing = true;

    // Tell modules to close
    this.app.emit('close', makeContext(this));

    // Close modules one by one in FILO order, so module that was installed last
    // is closed first.
    await Object.values(this.modules)
      .reverse()
      .reduce(async (aggPromise, mod) => {
        await aggPromise;
        logger.info(`Closing server module ${mod.name}`);
        await this.closeModule(mod);
        logger.info(`Done closing server module ${mod.name}`);
      }, Promise.resolve());

    await new Promise((res, rej) => {
      if (!this.server) return res(undefined);

      logger.info(`Waiting for server to close`);
      return this.server.close((err) => {
        err ? rej(err) : res(undefined);
      });
    });

    this.isClosing = false;
  }

  addContextProp(
    key: string,
    val: unknown,
    options: { reservedProps: string[] }
  ): void {
    const { reservedProps = [] } = options;

    if (reservedProps.includes(key)) {
      throw Error(`Context prop "${key}" is a reserved key.`);
    }

    if (this.contextProps[key]) {
      throw Error(`Context prop "${key}" is already defined.`);
    }

    this.contextProps[key] = val;
  }

  listen(port: number): ServerContext {
    this.server = http.createServer(this.app);

    this.server.listen(port, () => {
      logger.info(
        `up and running in ${
          process.env.NODE_ENV || 'development'
        } @: ${os.hostname()} on port: ${port}}`
      );

      this.server?.on('close', () => {
        // If isClosing is true, then server was shut down by us
        if (!this.isClosing) this.close();
      });

      this.app.emit('listen', makeContext(this));
    });

    return this;
  }
}

export default ServerContext;
export type { ServerContext, ServerContextOptions };
