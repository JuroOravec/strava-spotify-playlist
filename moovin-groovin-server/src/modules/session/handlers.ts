import type { NextFunction, Request, Response, RequestHandler } from 'express';

import type { ServerModule, Services } from '../../lib/ServerModule';
import type { SessionData } from './data';
import type { SessionDeps } from './types';

type LogoutParams = Record<'redirect_url', string>;
type LogoutReq = Request<Record<string, string>, any, any, LogoutParams>;

type SessionHandlers = Record<
  'logout',
  RequestHandler<Record<string, string>, any, any, any>
>;

type ThisModule = ServerModule<
  Services,
  SessionHandlers,
  SessionData,
  SessionDeps
>;

const createSessionHandlers = (): SessionHandlers => {
  function logout(
    this: ThisModule,
    req: LogoutReq,
    res: Response,
    next: NextFunction
  ) {
    req.logout();

    const { redirect_url: redirectUrl } = req.query;

    if (redirectUrl) {
      res.redirect(redirectUrl);
      return next();
    }

    res.json({ ok: true, errors: [] });
    next();
  }

  return {
    logout,
  };
};

export { createSessionHandlers as default, SessionHandlers };
