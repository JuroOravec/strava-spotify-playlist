import type { PGClientOptions } from '../../lib/PGStore/resolvePgClient';

interface SessionExternalData {
  clientConfig: PGClientOptions;
  initializePassport: boolean;
}

type SessionData = SessionExternalData;

export { SessionData };
