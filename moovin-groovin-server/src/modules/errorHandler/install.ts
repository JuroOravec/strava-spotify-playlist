import type { Request, Response, NextFunction } from 'express';
import type { HttpError } from 'express-openapi-validator/dist/framework/types';
import * as Sentry from '@sentry/node';

import ServerModule, {
  Handlers,
  Installer,
  ModuleContext,
  Services,
} from '../../lib/ServerModule';
import logger from '../../lib/logger';
import { isDevelopment } from '../../utils/env';
import { ErrorHandlerData } from './data';

const lastToFirst = (arr: any[]) => arr.unshift(arr.pop());

const errorHandler = (
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
  errors.forEach((error) => logger.error(error));

  res.status(err.status || 500).json({ ok: false, errors });
};

const createErrorHandlerInstaller = (): Installer => {
  const install: Installer = function install(
    this: ServerModule<Services, Handlers, ErrorHandlerData>,
    ctx: ModuleContext
  ) {
    const { app } = ctx;

    const sentryConfig =
      typeof this.data.sentry === 'function'
        ? this.data.sentry(ctx)
        : this.data.sentry;
    Sentry.init(sentryConfig);

    // TracingHandler creates a trace for every incoming request
    app.use(Sentry.Handlers.tracingHandler());
    lastToFirst(app._router.stack);

    app.use(Sentry.Handlers.requestHandler(this.data.sentryRequestHandler));
    // As per docs, the request handler must be the first middleware on the app
    lastToFirst(app._router.stack);

    // As per docs, the error handler must go before other error handlers
    app.use(Sentry.Handlers.errorHandler());
    app.use(errorHandler);
  };

  return install;
};

export default createErrorHandlerInstaller;
