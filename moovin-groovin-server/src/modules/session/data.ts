import type { PGClientOptions } from '../../lib/PGStore/resolvePgClient';

interface SessionExternalData {
  clientConfig: PGClientOptions;
}

type SessionData = SessionExternalData;

export { SessionData };
