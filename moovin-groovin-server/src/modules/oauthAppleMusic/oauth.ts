import path from 'path';

import { asyncSafeInvoke } from '@moovin-groovin/shared';
import unixTimestamp from '../../utils/unixTimestamp';
import {
  ServerModule,
  OAuthCreator,
  Services,
  assertContext,
} from '../../lib/ServerModule';
import type { AuthToken } from '../storeToken/types';
import type { OAuthDeps } from '../oauth/types';
import type { OAuthAppleMusicData } from './data';
import type { OAuthHandlers } from '../oauth/handlers';
import type { OAuthModule } from '../oauth';
import AppleMusicStrategy, {
  StrategyOptionsWithRequest,
  VerifyFunctionWithRequest,
} from './passportAppleMusic';

type ThisModule = ServerModule<
  Services,
  OAuthHandlers,
  OAuthAppleMusicData,
  OAuthDeps & { oauth: OAuthModule }
>;

const passportVerifier: VerifyFunctionWithRequest = async function verifier(
  this: ThisModule,
  req,
  accessToken,
  refreshToken,
  profile,
  done
) {
  const { error } = await asyncSafeInvoke(async () => {
    assertContext(this.context);
    const {
      processIntegrationProviderToken,
    } = this.context.modules.oauth.services;

    const devToken = req.query.id_token_hint;

    const token: AuthToken = {
      accessToken,
      refreshToken,
      providerId: profile.provider,
      providerUserId: req.user?.internalUserId as string,
      expiresAt: Math.round(unixTimestamp() + (profile.expiresIn || 0)),
      scope: (req.query.scope as string) ?? null,
      extra: {
        devToken: devToken ?? null,
      },
    };

    return processIntegrationProviderToken(
      token,
      req.user?.internalUserId,
      req.isAuthenticated()
    );
  });

  return done(error, req.user ?? undefined);
};

const createOAuth = (): OAuthCreator => {
  const oauth: OAuthCreator = function oauth(
    this: ThisModule,
    { callbackUrl }
  ) {
    const verifier = passportVerifier.bind(this);
    const options: StrategyOptionsWithRequest = {
      teamID: this.data.teamId,
      keyID: this.data.keyId,
      privateKeyLocation: path.join(
        __dirname,
        `./config/AuthKey_${this.data.keyId}.p8`
      ),
      callbackURL: callbackUrl,
      passReqToCallback: true,
    };

    const strategy = new AppleMusicStrategy(options, verifier);

    return strategy;
  };
  return oauth;
};

export default createOAuth;
