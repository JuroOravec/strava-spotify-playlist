import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import type {
  ServerModule,
  ModuleContext,
  Installer,
} from '../../lib/ServerModule';
import logger from '../../lib/logger';
import type { BaseData } from './data';

const createBaseInstaller = (): Installer => {
  const install: Installer = function install(
    this: ServerModule<any, any, BaseData>,
    { app }: ModuleContext
  ) {
    app.set('appPath', `${this.data.root}client`);
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || '100kb',
      })
    );
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(express.static(`${this.data.root}/public`));
  };

  return install;
};

export { createBaseInstaller as default };
