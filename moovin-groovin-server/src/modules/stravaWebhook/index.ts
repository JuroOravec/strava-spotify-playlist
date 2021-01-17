import { v4 as genUuid } from 'uuid';
import path from 'path';

import ServerModule from '../../lib/ServerModule';
import { ServerModuleName, SetRequiredFields } from '../../types';
import createRouter from './router';
import createInstaller from './install';
import createHandlers from './handlers';
import createServices, { StravaWebhookServices } from './services';
import { StravaWebhookData, StravaWebhookExternalOptions } from './data';

type StravaWebhookModuleOptions = SetRequiredFields<
  StravaWebhookExternalOptions,
  'webhookCallbackUrl'
>;

type StravaWebhookModule = ServerModule<
  StravaWebhookServices,
  ReturnType<typeof createHandlers>,
  StravaWebhookData
>;

const createStravaWebhookModule = (
  options: StravaWebhookModuleOptions
): StravaWebhookModule => {
  const {
    verifyToken = genUuid(),
    activitiesPerPage = 50,
    subscription = true,
    overrideSubscription = false,
  } = options;

  return new ServerModule({
    name: ServerModuleName.STRAVA_WEBHOOK,
    install: createInstaller(),
    router: createRouter(),
    services: createServices(),
    handlers: createHandlers(),
    data: {
      ...options,
      verifyToken,
      activitiesPerPage,
      subscription,
      overrideSubscription,
      sub: null,
    },
    openapi: path.join(__dirname, './api.yml'),
  });
};

export {
  createStravaWebhookModule as default,
  StravaWebhookModule,
  StravaWebhookModuleOptions,
};
