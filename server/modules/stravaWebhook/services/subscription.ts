import isNil from 'lodash/isNil';
import strava from 'strava-v3';
import { v4 as genUuid } from 'uuid';

import type { Services } from '../../../lib/ServerModule';
import logger from '../../../lib/logger';
import type { StravaPushSub } from '../types';

interface SubscribeWebhookOptions {
  callbackUrl?: string;
  verifyToken?: string;
  override?: boolean;
}

type StravaWebhookSubscriptionServices = {
  subscribeWebhook: (
    options?: SubscribeWebhookOptions
  ) => Promise<StravaPushSub>;
  unsubscribeWebhook: (
    id: StravaPushSub['id']
  ) => Promise<StravaPushSub | null>;
} & Services;

const createStravaWebhookSubscriptionServices = (): StravaWebhookSubscriptionServices => {
  const getSubsciption = async (
    id?: StravaPushSub['id']
  ): Promise<StravaPushSub | undefined> => {
    logger.info(`Fetching existing Strava push subscriptions`);
    const subs: StravaPushSub[] = await strava.pushSubscriptions.list();
    logger.info(`Fetched existing Strava push subscriptions`);

    // NOTE: Currently, Strava permits only one push sub per application,
    // so a sub exists, we know its ours. If this does not hold true, raise error.
    if (subs.length > 1) {
      const ids = subs.map((sub) => sub.id).join(', ');
      throw Error(
        `Expected to have at most 1 Strava push subscription (IDs: ${ids})`
      );
    }

    const sub = isNil(id) ? subs[0] : subs.find((sub) => sub.id === id);

    return sub;
  };

  const subscribeWebhook = async (
    options: SubscribeWebhookOptions = {}
  ): Promise<StravaPushSub> => {
    const { callbackUrl, verifyToken = genUuid(), override = false } = options;

    const sub = await getSubsciption();

    if (sub && !override) {
      logger.info(`Using existing Strava push subscription (ID: ${sub.id})`);
      return sub;
    }

    if (sub && override && sub.callback_url !== callbackUrl) {
      logger.info(`Deleting existing Strava push subscription (ID: ${sub.id})`);
      strava.pushSubscriptions.delete(sub.id);
    }

    logger.info(`Creating new Strava push subscription`);
    // Note: When creating a sub, we get back only the ID
    const { id: newSubId } = await strava.pushSubscriptions.create({
      callback_url: callbackUrl,
      verify_token: verifyToken,
    });
    logger.info(`Created new Strava push subscription (ID: ${newSubId})`);

    const newSub = await getSubsciption(newSubId);

    if (!newSub) {
      throw Error(`Cannot find Strava push subscription (IDs: ${newSubId})`);
    }

    return newSub;
  };

  /** Remove Strava sub. Returns removed sub or null if sub not found */
  const unsubscribeWebhook = async (
    id: StravaPushSub['id']
  ): Promise<StravaPushSub | null> => {
    const removedSub = await getSubsciption(id);

    if (!removedSub) {
      logger.info(
        `Cannot delete Strava push subscription: Subscription does not exist (ID: ${id})`
      );
      return null;
    }

    logger.info(`Deleting Strava push subscription (ID: ${id})`);
    await strava.pushSubscriptions.delete({ id });
    logger.info(`Deleted Strava push subscription (ID: ${id})`);

    return removedSub;
  };

  return {
    subscribeWebhook,
    unsubscribeWebhook,
  };
};

export {
  createStravaWebhookSubscriptionServices as default,
  StravaWebhookSubscriptionServices,
};
