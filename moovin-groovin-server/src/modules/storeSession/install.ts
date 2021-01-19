import session from 'express-session';
import createPgSession from 'connect-pg-simple';
import pg from 'pg';

import type {
  ServerModule,
  Installer,
  Services,
  Handlers,
} from '../../lib/ServerModule';
import type { StoreSessionData } from './data';
import PGSessionStore from './lib/PGSessionStore';

const createStoreSessionInstaller = (): Installer => {
  const PGSession = createPgSession(session);

  const install: Installer = async function install(
    this: ServerModule<Services, Handlers, StoreSessionData>
  ) {
    this.data.sessionStore = new PGSessionStore(this.data.clientConfig);
    await this.data.sessionStore.install();

    const { client, pool } = this.data.sessionStore as any;
    const clientOrPool = client ?? pool;
    this.data.expressSessionStore = new PGSession({
      pool: clientOrPool as pg.Pool,
    });
  };

  return install;
};

export { createStoreSessionInstaller as default };
