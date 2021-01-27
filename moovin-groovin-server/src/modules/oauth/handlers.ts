import type { NextFunction, Request, Response, RequestHandler } from 'express';
import { BadRequest } from 'express-openapi-validator/dist/framework/types';
import passport, { AuthenticateOptions } from 'passport';

import logger from '../../lib/logger';
import type { ServerModule } from '../../lib/ServerModule';
import { asyncSafeInvoke } from '../../utils/safeInvoke';
import { ServerModuleName } from '../../types';
import type { OAuthData } from './data';
import type { OAuthDeps } from './types';
import type { OAuthServices } from './services';
import type { UserModel } from '../storeUser/types';

type OAuthHandlers = Record<
  'authLogin' | 'authCallback',
  RequestHandler<Record<string, string>, any, any, any>
>;

type AuthLoginParams = Record<'redirect_url' | 'error', string>;
type AuthLoginReq = Request<Record<string, string>, any, any, AuthLoginParams>;

type AuthCallbackParams = Record<
  'redirect_url' | 'error' | 'scope' | 'code',
  string
>;
type AuthCallbackReq = Request<
  Record<string, string>,
  any,
  any,
  AuthCallbackParams
>;

type ThisModule = ServerModule<
  OAuthServices,
  OAuthHandlers,
  OAuthData,
  OAuthDeps & {
    [ServerModuleName.OAUTH]: ServerModule<
      OAuthServices,
      OAuthHandlers,
      OAuthData
    >;
  }
>;

const createOAuthHandlers = (
  provider: string,
  options: AuthenticateOptions = {}
): OAuthHandlers => {
  const { ...passportOptions } = options;

  /**
   * Handler for logging user via third party OAuth providers
   * with the intention to get and use the provider's user ID
   * for user identification.
   */
  function authLogin(
    this: ThisModule,
    req: AuthLoginReq,
    res: Response,
    next: NextFunction
  ) {
    // TODO: Allow to pass data from module initiation
    const passportAuthOptions = {
      failWithError: true,
      session: false,
      showDialog: true,
      passReqToCallback: true,
      ...passportOptions,
    };

    // We handle the result ourselves so we can pass the errors as error query
    // params to the callback.
    // For context, see https://stackoverflow.com/q/48917804/9788634
    const passportAuthCallback = (
      error: Error | null,
      user: UserModel | null,
      info?: any
    ) => {
      if (error || !user?.internalUserId) {
        // We assume this handler will be followed by the callback handler
        req.query.error = error?.message ?? 'Failed to find user.';
        return next();
      }
      req.login(user, (loginErr) => {
        if (loginErr) {
          req.query.error = loginErr?.message;
        }
        return next();
      });
    };

    const passportAuthHandler = passport.authenticate(
      provider,
      passportAuthOptions,
      passportAuthCallback
    );

    // Delegate the rest of handling to passport
    return passportAuthHandler(req, res, next);
  }

  /**
   * Handler for callback after logging user via third party OAuth providers
   * with the intention to get and use the provider's user ID
   * for user identification.
   */
  function authCallback(
    this: ThisModule,
    req: AuthCallbackReq,
    res: Response,
    next: NextFunction
  ) {
    asyncSafeInvoke<void>(async () => {
      const { error, redirect_url: redirectUrl } = req.query;

      if (error) throw new BadRequest({ path: req.path, message: error });

      if (redirectUrl) {
        res.redirect(redirectUrl);
        return next();
      }

      res.json({ ok: true, errors: [] });
      next();
    }).then(({ error }) => {
      if (error) next(error);
    });
  }

  return {
    authLogin,
    authCallback,
  };
};

export { createOAuthHandlers as default, OAuthHandlers };
