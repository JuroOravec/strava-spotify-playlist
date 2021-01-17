import type { NextFunction, Request, Response, RequestHandler } from 'express';

import logger from '../../lib/logger';
import type { Handlers, ServerModule } from '../../lib/ServerModule';
import type { OAuthStravaModule } from '../oauthStrava';
import { webhookEvents } from './types';
import type { StravaWebhookServices } from './services';
import type { StravaWebhookData } from './data';
import { isActivityEvent, isAthleteDeauthEvent } from './utils/event';

type StravaWebhookHandlers = Record<
  'webhookConfirm' | 'webhookCallback',
  RequestHandler<Record<string, string>, any, any, any>
>;

type WebhookConfirmReq = Request<
  Record<string, string>,
  any,
  any,
  Record<'hub.mode' | 'hub.verify_token' | 'hub.challenge', string>
>;

type WebhookCallbackReq = Request<
  Record<string, string>,
  any,
  any,
  Record<string, string>
>;

type ThisModule = ServerModule<
  StravaWebhookServices,
  Handlers,
  StravaWebhookData,
  { stravaAuth: OAuthStravaModule }
>;

const createStravaWebhookHandlers = (): StravaWebhookHandlers => {
  /** Verifies that the mode and token sent are valid */
  const webhookConfirm = function webhookConfirm(
    this: ThisModule,
    req: WebhookConfirmReq,
    res: Response,
    next: NextFunction
  ) {
    const {
      'hub.mode': mode,
      'hub.challenge': challenge,
      'hub.verify_token': token,
    } = req.query;

    const modeIsCorrect = mode === 'subscribe';
    const tokenIsCorrect = token === this.data.verifyToken;

    if (!modeIsCorrect) {
      logger.info(
        `Cannot confirm Strava webhook: Invalid mode "${mode}", expected "subscribe"`
      );
    }

    if (!tokenIsCorrect) {
      logger.info(
        `Cannot confirm Strava webhook: Invalid token "${token}", expected "${this.data.verifyToken}"`
      );
    }

    if (!modeIsCorrect || !tokenIsCorrect) {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
      return next();
    }

    // Responds with the challenge token from the request
    logger.info(`Confirming Strava webhook against challenge "${challenge}"`);
    res.json({ 'hub.challenge': challenge });
  };

  function webhookCallback(
    this: ThisModule,
    req: WebhookCallbackReq,
    res: Response,
    next: NextFunction
  ) {
    const event = req.body;
    if (!event) {
      logger.info('Invalid Strava webhook event: No event data received');
      res.status(400);
      return next(Error('No event data received'));
    }

    logger.info(
      `Received Strava webhook event (${event.aspect_type.toUpperCase()} ${event.object_type.toUpperCase()} ${
        event.object_id
      } (OWNER ID: ${event.owner_id})`
    );

    // End early if event not among cases we care about
    if (!isAthleteDeauthEvent(event) && !isActivityEvent(event)) {
      logger.info('Skipping event: Event type not in scope');
      res.status(200);
      return next();
    }

    if (isAthleteDeauthEvent(event)) {
      // object_id and owner_id should be the same in this case,
      // but use object_id as it describes the affected object.
      const stravaUserId = event.object_id.toString();
      if (event.updates.authorized === webhookEvents.BooleanType.FALSE) {
        this.services.unregisterAthlete(stravaUserId);
      }
    }

    if (isActivityEvent(event)) {
      const activityId = event.object_id.toString();
      const stravaUserId = event.owner_id.toString();

      if (event.aspect_type === webhookEvents.AspectType.CREATE) {
        this.services.registerAthleteActivity(stravaUserId, activityId);
      }

      if (event.aspect_type === webhookEvents.AspectType.DELETE) {
        this.services.unregisterAthleteActivity(stravaUserId, activityId);
      }

      if (event.aspect_type === webhookEvents.AspectType.UPDATE) {
        // DO NOTHING
      }
    }

    res.status(200).json({ ok: true, errors: [], message: 'Event received.' });
    next();
  }

  return {
    webhookConfirm,
    webhookCallback,
  };
};

export { createStravaWebhookHandlers as default, StravaWebhookHandlers };
