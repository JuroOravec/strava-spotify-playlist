import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import type {
  ServerModule,
  ModuleContext,
  Installer,
  Services,
  Handlers,
} from '../../lib/ServerModule';
import type { BaseData } from './data';

const createBaseInstaller = (): Installer => {
  const install: Installer = function install(
    this: ServerModule<Services, Handlers, BaseData>,
    context: ModuleContext
  ) {
    const { app } = context;

    app.set('trust proxy', true);
    app.set('appPath', `${this.data.root}client`);
    app.use(
      cors({
        // TODO: Set these values in config
        // TODO: When having multiple envs (e.g., prod and dev), do not include localhost on prod
        origin: [
          'https://moovingroovin.com',
          'https://www.moovingroovin.com',
          /^http\:\/\/localhost\:\d+/,
        ],
        credentials: true,
      })
    );
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

    // Specify view folders
    const oneOrMoreViewDirs =
      typeof this.data.viewDirs === 'function'
        ? this.data.viewDirs(context)
        : this.data.viewDirs;
    const viewDirs = Array.isArray(oneOrMoreViewDirs)
      ? oneOrMoreViewDirs
      : [oneOrMoreViewDirs];

    app.set('views', viewDirs);
  };

  return install;
};

export default createBaseInstaller;
