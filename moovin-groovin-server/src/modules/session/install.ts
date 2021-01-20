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
import { asyncSafeInvoke } from '../../utils/safeInvoke';
import type { SessionData } from './data';
import type { SessionDeps } from './types';
import type { PassportUser } from '../oauth/types';

const createSessionInstaller = (): Installer => {
  const install: Installer = function install(
    this: ServerModule<Services, Handlers, SessionData, SessionDeps>,
    { app }: ModuleContext
  ) {
    assertContext(this.context);
    const storeSession = this.context.modules.storeSession;
    if (!storeSession.data.expressSessionStore) {
      throw Error('Session module requires Postgres pool or client instance.');
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
    // Note: for passport sessions to work correctly, we need to call
    // passport.initialize() after express-session and before passport.session().
    if (this.data.initializePassport) {
      app.use(passport.initialize());
    }
    app.use(passport.session());

    passport.serializeUser(async (userData, done) => {
      const { result, error } = await asyncSafeInvoke(async () => {
        const { user } = (userData ?? {}) as PassportUser;
        if (!user) {
          throw Error('User not found');
        }
        return user.internalUserId;
      });
      done(error, result);
    });

    passport.deserializeUser(async (id: string, done) => {
      const { result, error } = await asyncSafeInvoke(async () => {
        if (!id) {
          throw Error('User not found');
        }

        assertContext(this.context);
        const { getUser } = this.context.modules.storeUser.services;
        const user = await getUser(id);

        if (!user) {
          throw Error(`No user with ID "${id}"`);
        }

        return user;
      });
      done(error, result ?? undefined);
    });
  };

  return install;
};

export { createSessionInstaller as default };
