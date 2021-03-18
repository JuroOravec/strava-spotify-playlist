import PGStore from '../../../lib/PGStore';
import { getQueries, SessionStoreSQLQueries } from '../sql';
import type { SessionStore } from '../types';

class PGSessionStore
  extends PGStore<SessionStoreSQLQueries>
  implements SessionStore {
  async doInstall(): Promise<void> {
    this.queries = await getQueries();
  }
}

export default PGSessionStore;
