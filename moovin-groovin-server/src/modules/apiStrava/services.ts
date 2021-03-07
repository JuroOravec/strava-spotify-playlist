import strava from 'strava-v3';

import { ServerModule, Handlers, assertContext } from '../../lib/ServerModule';
import type { ApiStravaDeps } from './types';
import type { ApiStravaData } from './data';
import type { StravaClient } from './types';

type ApiStravaServices = {
  getClientForAthlete: (stravaUserId: string) => Promise<StravaClient>;
};

type ThisModule = ServerModule<
  ApiStravaServices,
  Handlers,
  ApiStravaData,
  ApiStravaDeps
>;

const createApiStravaServices = (): ApiStravaServices => {
  function getClient(accessToken: string): StravaClient {
    // @ts-ignore
    return new strava.client(accessToken);
  }

  async function getClientForAthlete(
    this: ThisModule,
    stravaUserId: string
  ): Promise<StravaClient> {
    assertContext(this.context);

    const { getAccessToken } = this.context.modules.oauthStrava.services;
    const accessToken = await getAccessToken(stravaUserId);
    return getClient(accessToken);
  }

  return {
    getClientForAthlete,
  };
};

export default createApiStravaServices;
export type { ApiStravaServices };
