import crypto from 'crypto';
import type { NextFunction, Request, Response, RequestHandler } from 'express';
import { BadRequest } from 'express-openapi-validator/dist/framework/types';
import passport, { AuthenticateOptions } from 'passport';
import NodeCache from 'node-cache';
import isNil from 'lodash/isNil';

import logger from '../../lib/logger';
import { assertContext, ServerModule } from '../../lib/ServerModule';
import { safeInvoke, asyncSafeInvoke } from '../../utils/safeInvoke';
import { ServerModuleName } from '../../types';
import type { OAuthData } from './data';
import type { OAuthDeps, PassportUser } from './types';
import type { OAuthServices } from './services';
import { serializeState, deserializeState } from './utils/state';
import { resolveProviderLoginUrl } from './utils/providerUrl';

type OAuthHandlers = Record<
  'authLogin' | 'authCallback',
  RequestHandler<Record<string, string>, any, any, any>
>;

type AuthLoginParams = Record<
  'redirect_url' | 'user_id' | 'ssp.verify_token' | 'state' | 'code',
  string
>;
type AuthLoginReq = Request<Record<string, string>, any, any, AuthLoginParams>;

type AuthCallbackParams = Record<'state' | 'error' | 'scope' | 'code', string>;
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

interface StateParam {
  redirectUrl?: string;
  userId?: string;
}

interface CacheItem {
  userId: string;
  providerUserId: string;
  providerId: string;
}

function assertCache(cache: NodeCache | null): asserts cache {
  if (!cache || !(cache instanceof NodeCache)) {
    throw Error('Failed to access verification token cache.');
  }
}

const createOAuthHandlers = (
  provider: string,
  options: AuthenticateOptions & {
    requireUserId?: boolean;
    assertScope?: (scope?: string) => void;
  } = {}
): OAuthHandlers => {
  const { requireUserId, assertScope, ...passportOptions } = options;

  const createPassportAuthHandler = (state: StateParam = {}) => (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const passportAuthOptions = {
      failWithError: true,
      session: false,
      state: serializeState(state),
      passReqToCallback: true,
      ...passportOptions,
    };

    const passportAuthCallback = (
      error: Error | null,
      user: PassportUser | null,
      info?: any
    ) => {
      if (error || !user) {
        // We assume this handler will be followed by the callback handler
        req.query.error = error?.message ?? 'Failed to find user.';
        return next();
      }
      req.login(user, (loginErr) => {
        if (loginErr) {
          req.query.error = loginErr?.message;
          return next();
        }
        return next();
      });
    };

    const passportAuthHandler = passport.authenticate(
      provider,
      passportAuthOptions,
      passportAuthCallback
    );

    return passportAuthHandler(req, res, next);
  };

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
    const {
      redirect_url: redirectUrl,
      user_id: rawUserId,
      'ssp.verify_token': verifyToken,
      state,
      code: authCode,
    } = req.query;

    // User ID can come from either 'user_id' query param
    // or state query param with shape '{ userId }'.
    let userId = rawUserId;
    if (!userId) {
      const { result: stateObj } = safeInvoke<StateParam>(() =>
        deserializeState(state || '{}')
      );
      if (stateObj?.userId) {
        userId = stateObj?.userId as string;
      }
    }

    if (requireUserId && isNil(userId)) {
      throw new BadRequest({
        path: req.path,
        message:
          'Missing required query parameter "user_id". Cannot authenticate unknown user.',
      });
    }

    if (requireUserId && Number.isNaN(userId)) {
      throw new BadRequest({
        path: req.path,
        message: 'Invalid required query parameter "user_id".',
      });
    }

    asyncSafeInvoke<void>(async () => {
      // If this provider needs user ID, we will verify user of that ID against the provider
      // that initially authorized the user. Once that is confirmed, we can continue with
      // auth against current provider.
      //
      // If there is an auth code, this means the request is claiming it was already
      // validated by the provider.
      if (requireUserId && !authCode) {
        assertContext(this.context);
        const { getUser } = this.context.modules.storeUser.services;
        const user = await getUser(userId);

        if (!user) {
          throw new BadRequest({
            path: req.path,
            message: 'Invalid required query parameter "user_id".',
          });
        }

        const { getTokensByUser } = this.context.modules.storeToken.services;
        const tokens = (await getTokensByUser(userId)) || [];

        // Get all providers that can be used to log user in
        const loginProviders =
          this.context.modules.oauth.data.resolvedProviders
            ?.filter((p) => p.isLoginProvider)
            .map((p) => p.providerId) || [];

        // Try to use the provider that user logged in with initally. If it cannot be found
        // use any other login provider
        const { providerUserId, providerId } =
          tokens.find((token) => token.providerId === user.loginProvider) ||
          tokens.find((token) => loginProviders.includes(token.providerId)) ||
          {};

        if (isNil(providerUserId) || isNil(providerId)) {
          // TODO: If we're here then the user should be removed, because we have no
          // way of verifying their identity
          throw new BadRequest({
            path: req.path,
            message: 'Invalid required query parameter "user_id".',
          });
        }

        // At this point we know we were given a valid user ID. Now we need to validate
        // that the ID indeed came from its owner. We do so by calling authorization with
        // the provider with whom the user logged in the first time. We check if the user that
        // logs in has the same providerUserId as the one that the request is trying to access.
        //
        // We pass to the provider a callback url that returns to this handler. We pass
        // a random verification token to the callback url as a query parameter. When user
        // logs in successfully, they will be redirected back here with the verification token
        // among the parameters.

        // Note: This handler is intended to be used by other oauth modules,
        // so we have to access the data via context.
        const { cache, callbackUrlRoot } = this.context.modules.oauth.data;
        assertCache(cache);

        // In this case, this is the first time the user came to this endpoint,
        // as the url doesn't include the verification token. We send the user to verify.
        if (isNil(verifyToken)) {
          const verifyToken = crypto.randomBytes(20).toString('hex');
          cache.set<CacheItem>(verifyToken, {
            userId,
            providerUserId,
            providerId,
          });

          const { resolveUrl } = this.context.modules.host.services;
          const providerLoginUrl = resolveProviderLoginUrl(
            await resolveUrl(callbackUrlRoot),
            user.loginProvider
          );

          const fullUrl =
            req.protocol + '://' + req.get('host') + req.originalUrl;
          // Ensure that the next time user comes back, they've been verified
          const verifiedUrlHelper = new URL(fullUrl);
          verifiedUrlHelper.searchParams.set('ssp.verify_token', verifyToken);

          // Pass the verified url through the login flow by setting it to redirect_url.
          const providerUrlHelper = new URL(providerLoginUrl);
          providerUrlHelper.searchParams.set(
            'redirect_url',
            verifiedUrlHelper.toString()
          );

          const redirectUrl = providerUrlHelper.toString();
          res.redirect(redirectUrl);
          return next();
        }

        if (isNil(verifyToken)) {
          throw new BadRequest({
            path: req.path,
            message:
              'Invalid or expired verification token. Return to homepage and try to log in again',
          });
        }

        // Here, the user has logged in via the provider and has provided us with the
        // verification token. We check if its correct and not expired, and if so,
        // we let the user continue.

        const {
          userId: verifiedUserId,
          providerUserId: expectedProviderUserId,
          providerId: expectedProviderId,
        } = cache.get<CacheItem>(verifyToken) || {};

        if (
          isNil(verifiedUserId) ||
          isNil(expectedProviderUserId) ||
          isNil(providerId) ||
          expectedProviderUserId !== providerUserId ||
          expectedProviderId !== providerId
        ) {
          throw new BadRequest({
            path: req.path,
            message:
              'Invalid or expired verification token. Return to homepage and try to log in again',
          });
        }

        userId = verifiedUserId;

        // User verified successfully, so remove the key from the cache so it cannot be used again.
        cache.del(verifyToken);
      }

      // Delegate the rest of handling to passport
      const authHandler = createPassportAuthHandler({
        redirectUrl,
        userId,
      });
      return authHandler(req, res, next);
    }).then(({ result, error }) => {
      if (error) next(error);
      return result;
    });
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
      const { error, state, scope } = req.query;

      if (error) throw new BadRequest({ path: req.path, message: error });

      if (assertScope) {
        await asyncSafeInvoke(
          () => assertScope(scope),
          (e) => {
            throw new BadRequest({
              path: req.path,
              message: e.message,
            });
          }
        );
      }

      if (requireUserId && !state) {
        throw new BadRequest({
          path: req.path,
          message:
            'Missing required query parameter "state". Cannot authenticate unknown user.',
        });
      }

      const { result: stateObj } = safeInvoke<StateParam>(() =>
        deserializeState(state || '{}')
      );

      const { userId, redirectUrl } = stateObj || {};

      const passportUser = req.user as PassportUser | undefined;
      if (!passportUser) {
        throw new BadRequest({
          path: req.path,
          message: 'Failed to authorize user.',
        });
      }
      const { user, token } = passportUser;

      assertContext(this.context);
      const { upsertToken } = this.context.modules.storeToken.services;

      if (requireUserId) {
        if (isNil(userId)) {
          throw new BadRequest({
            path: req.path,
            message: 'No user ID found. Cannot authenticate unknown user.',
          });
        }

        const { error: validationError } = await asyncSafeInvoke(async () => {
          assertContext(this.context);
          const { validatePassportUser } = this.context.modules.oauth.services;
          return validatePassportUser(userId, passportUser);
        });

        if (validationError) {
          throw new BadRequest({
            path: req.path,
            message: validationError.message,
          });
        }
        // At this point, we know that we've been given a valid user ID and
        // the user has authorized, so we can associate the user ID with
        // the provider's user ID.
        await upsertToken({
          ...token,
          internalUserId: userId,
          scope: scope || null,
        });
      } else {
        // This is the case when this handler is used by login provider who created
        // a user for us, so we should have user info available.

        if (!user.internalUserId) {
          // This should never happen. If we get here, we did not pass userID
          // in provider's passport or we've turned off 'requireUserId' flag
          throw new BadRequest({
            path: req.path,
            message: 'Failed to process user authorization.',
          });
        }

        await upsertToken({
          ...token,
          internalUserId: user.internalUserId,
          scope: scope || null,
        });
      }

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
