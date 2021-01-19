import passport from 'passport';
import session from 'express-session';
import { v4 as genUuid } from 'uuid';

import {
  ServerModule,
  ModuleContext,
  Installer,
  Services,
  Handlers,
  assertContext,
} from '../../lib/ServerModule';
import logger from '../../lib/logger';
import type { SessionData } from './data';
import type { SessionDeps } from './types';

const createSessionInstaller = (): Installer => {
  const install: Installer = function install(
    this: ServerModule<Services, Handlers, SessionData, SessionDeps>,
    { app }: ModuleContext
  ) {
    assertContext(this.context);
    const storeSession = this.context.modules.storeSession;
    storeSession.once('storeSession:didInstall', () => {
      if (!storeSession.data.expressSessionStore) {
        throw Error(
          'Session module requires Postgres pool or client instance.'
        );
      }

      app.use(
        session({
          name: 'moovin-groovin.sid',
          secret: '81e9b121-09d6-44b6-a06f-84cbc73c60fd',
          store: storeSession.data.expressSessionStore,
          resave: false,
        saveUninitialized: false,
        proxy: true,
          cookie: {
            // secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
          },
          genid: () => genUuid(),
        })
      );
    if (this.data.initializePassport) {
      app.use(passport.initialize());
    }
    app.use(passport.session());
    });
  };

  return install;
};

export { createSessionInstaller as default };
