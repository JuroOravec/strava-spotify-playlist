import isNil from 'lodash/isNil';

import { webhookEvents } from '../types';

const isAthleteDeauthEvent = (
  event?: webhookEvents.Event
): event is webhookEvents.AthleteDeauthEvent =>
  event?.object_type === webhookEvents.ObjectType.ATHLETE &&
  !isNil(event?.updates?.authorized);

const isActivityEvent = (
  event?: webhookEvents.Event
): event is webhookEvents.ActivityEvent =>
  event?.object_type === webhookEvents.ObjectType.ACTIVITY &&
  Object.values(webhookEvents.AspectType).includes(event?.aspect_type);

export { isActivityEvent, isAthleteDeauthEvent };
