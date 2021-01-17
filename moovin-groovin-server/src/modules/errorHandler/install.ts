import type { Request, Response, NextFunction } from 'express';
import type { HttpError } from 'express-openapi-validator/dist/framework/types';

import type { ModuleContext, Installer } from '../../lib/ServerModule';
import logger from '../../lib/logger';

const createErrorHandlerInstaller = (): Installer => {
  const install: Installer = function install({ app }: ModuleContext) {
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
  };

  return install;
};

export { createErrorHandlerInstaller as default };
