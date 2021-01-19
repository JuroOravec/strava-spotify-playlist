import PGStore from '../../../lib/PGStore';
import { getQueries, SessionStoreSQLQueries } from '../sql';
import type { SessionStore } from '../types';

class PGSessionStore
  extends PGStore<SessionStoreSQLQueries>
  implements SessionStore {
  async doInstall(): Promise<void> {
    this.queries = await getQueries();
    const {
      rows: [foundRow],
    } = await this.query('sessionTableExists');

    const sessionTableExists = foundRow?.table_exists ?? false;
    if (!sessionTableExists) await this.query('createSessionTable');
  }
}

export default PGSessionStore;
