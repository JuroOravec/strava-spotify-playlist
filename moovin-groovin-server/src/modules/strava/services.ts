import strava from 'strava-v3';

import {
  ServerModule,
  Handlers,
  Services,
  assertContext,
} from '../../lib/ServerModule';
import logger from '../../lib/logger';
import type { StravaDeps } from './types';
import type { StravaData } from './data';
import type { StravaClient } from './types';

type StravaServices = {
  getClientForAthlete: (stravaUserId: string) => Promise<StravaClient>;
} & Services;

type ThisModule = ServerModule<
  StravaServices,
  Handlers,
  StravaData,
  StravaDeps
>;

const createStravaServices = (): StravaServices => {
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

export { createStravaServices as default, StravaServices };
