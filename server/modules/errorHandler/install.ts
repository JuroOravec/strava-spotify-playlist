import type { Request, Response, NextFunction } from 'express';
import type { HttpError } from 'express-openapi-validator/dist/framework/types';

import type { ModuleContext, Installer } from '../../lib/ServerModule';
import logger from '../../lib/logger';

const createErrorHandlerInstaller = (): Installer => {
  const install: Installer = function install({ app }: ModuleContext) {
    logger.info('Setting up error handler');
    app.use(
      (
        err: HttpError,
        req: Request,
        res: Response,
        next: NextFunction
      ): void => {
        const errors = err.errors || [{ message: err.message }];
        res.status(err.status || 500).json({ ok: false, errors });
      }
    );
    logger.info('Done setting up error handler');
  };

  return install;
};

export { createErrorHandlerInstaller as default };
