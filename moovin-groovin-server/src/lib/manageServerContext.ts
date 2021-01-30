// @ts-ignore
import exitHook from 'async-exit-hook';

import ServerContext, { ServerContextOptions } from './ServerContext';
import logger from './logger';

interface ManageServerContext {
  instances: ServerContext[];
  createServerContext: (options: ServerContextOptions) => ServerContext;
}

const manageServerContext = (): ManageServerContext => {
  const instances: ServerContext[] = [];

  const closeAllApps = async (): Promise<void[]> =>
    Promise.all(
      instances.map(async (ctx) => {
        logger.info(`Closing http server "${ctx.name}".`);
        await ctx.close();
        logger.info(`Http server "${ctx.name}" closed.`);
      })
    );

  exitHook(async (callback: () => void) => {
    logger.info('Shutting down.');
    await closeAllApps();
    logger.info('Shutting down complete.');
    callback();
  });

  const createManagedServerContext = (options: ServerContextOptions) => {
    const serverContext = new ServerContext(options);
    instances.push(serverContext);
    return serverContext;
  };

  return {
    instances,
    createServerContext: createManagedServerContext,
  };
};

export default manageServerContext;
