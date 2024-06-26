import { OptionalPromise } from '@moovin-groovin/shared';
import ServerModule, {
  assertContext,
  Data,
  Handlers,
  Services,
} from '../../../lib/ServerModule';
import unixTimestamp from '../../../utils/unixTimestamp';
import type { UserTokenModel } from '../../storeToken/types';
import type { OAuthDeps } from '../types';

type RefreshedAuthToken = Pick<
  UserTokenModel,
  'accessToken' | 'refreshToken' | 'expiresAt'
>;

interface OAuthAccessTokenServices extends Services {
  getAccessToken: (providerUserId: string) => Promise<string>;
  refreshAccessToken: (providerUserId: string) => Promise<string>;
}

type ThisModule = ServerModule<
  OAuthAccessTokenServices,
  Handlers,
  Data,
  OAuthDeps
>;

function assertToken(
  token: UserTokenModel | null,
  providerId: string,
  userId: string
): asserts token {
  if (!token) {
    throw Error(
      `Failed to get access token for ${providerId} user ID "${userId}"`
    );
  }
}

const createOAuthAccessTokenServices = (
  providerId: string,
  options: {
    doRefreshAccessToken: (
      oldToken: UserTokenModel
    ) => OptionalPromise<RefreshedAuthToken | null>;
  }
): OAuthAccessTokenServices => {
  const { doRefreshAccessToken } = options;

  /** Refresh access token using a refresh token fetched by user ID. */
  async function refreshAccessToken(
    this: ThisModule,
    providerUserId: string
  ): Promise<string> {
    assertContext(this.context);
    const { getToken, upsertToken } = this.context.modules.storeToken.services;

    const token = await getToken({ providerUserId, providerId });
    assertToken(token, providerId, providerUserId);
    const newToken = await doRefreshAccessToken.call(this, token);

    await upsertToken({
      ...token,
      ...newToken,
      providerUserId,
      providerId,
      internalUserId: token.internalUserId,
    });

    return newToken?.accessToken ?? token.accessToken;
  }

  async function getAccessToken(
    this: ThisModule,
    providerUserId: string
  ): Promise<string> {
    assertContext(this.context);
    const { getToken } = this.context?.modules.storeToken.services;

    const token = await getToken({ providerUserId, providerId });
    assertToken(token, providerId, providerUserId);

    const { accessToken, expiresAt } = token;

    const cutoffValue =
      this.data.tokenExpiryCutoff >= 0 ? this.data.tokenExpiryCutoff : 0;
    const cutoffTimestamp = unixTimestamp() + cutoffValue;

    // Use refreshed access token if current expires within cutoff.
    const activeAccessToken =
      expiresAt <= cutoffTimestamp
        ? await this.services.refreshAccessToken(providerUserId)
        : accessToken;

    return activeAccessToken;
  }

  return {
    getAccessToken,
    refreshAccessToken,
  };
};

export default createOAuthAccessTokenServices;
export type { OAuthAccessTokenServices };
