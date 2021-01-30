import type { NextFunction, Request, Response, RequestHandler } from 'express';
import { BadRequest } from 'express-openapi-validator/dist/framework/types';
import passport, { AuthenticateOptions } from 'passport';

import logger from '../../lib/logger';
import type { ServerModule } from '../../lib/ServerModule';
import { asyncSafeInvoke, safeInvoke } from '../../utils/safeInvoke';
import { serializeState, deserializeState } from './utils/state';
import { ServerModuleName } from '../../types';
import type { OAuthData } from './data';
import type { OAuthDeps } from './types';
import type { OAuthServices } from './services';
import type { UserModel } from '../storeUser/types';

type OAuthHandlers = Record<
  'authLogin' | 'authCallback',
  RequestHandler<Record<string, string>, any, any, any>
>;

type AuthLoginParams = Record<'redirect_url' | 'state' | 'error', string>;
type AuthLoginReq = Request<Record<string, string>, any, any, AuthLoginParams>;

type AuthCallbackParams = Record<'error' | 'scope' | 'code' | 'state', string>;
type AuthCallbackReq = Request<
  Record<string, string>,
  any,
  any,
  AuthCallbackParams
>;

interface StateParam {
  redirectUrl?: string;
  origState?: string;
}

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
    const { redirect_url: redirectUrl, state: origState } = req.query;

    // TODO: Allow to pass data from module initiation
    const passportAuthOptions = {
      failWithError: true,
      session: false,
      showDialog: true,
      passReqToCallback: true,
      state: serializeState({ redirectUrl, origState }),
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
      const { error, state } = req.query;

      if (error) throw new BadRequest({ path: req.path, message: error });

      const { result: stateObj } = safeInvoke<StateParam>(() =>
        deserializeState(state || '{}')
      );
      const { redirectUrl, origState } = stateObj || {};

      if (redirectUrl) {
        const redirectUrlWithState = new URL(redirectUrl);
        if (origState) {
          redirectUrlWithState.searchParams.append('state', origState);
        }
        res.redirect(redirectUrlWithState.toString());
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
