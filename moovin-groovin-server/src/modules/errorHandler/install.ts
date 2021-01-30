import type { Request, Response, NextFunction } from 'express';
import type { HttpError } from 'express-openapi-validator/dist/framework/types';

import type { ModuleContext, Installer } from '../../lib/ServerModule';
import logger from '../../lib/logger';
import { isDevelopment } from '../../utils/env';

const createErrorHandlerInstaller = (): Installer => {
  const install: Installer = function install({ app }: ModuleContext) {
    app.use(
      (
        err: HttpError,
        req: Request,
        res: Response,
        next: NextFunction
      ): void => {
        // TODO: Move the isProd out
        const errors = err.errors ?? [
          !isDevelopment()
            ? { message: err.message }
            : {
                message: err.stack,
                user: req.user,
                session: req.session,
              },
        ];
        res.status(err.status || 500).json({ ok: false, errors });
      }
    );
  };

  return install;
};

export default createErrorHandlerInstaller;
