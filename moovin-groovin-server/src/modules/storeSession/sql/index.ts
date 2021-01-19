import 'connect-pg-simple';
import path from 'path';
import type { QueryResultRow } from 'pg';

import type { PGQueries } from '../../../lib/PGStore';
import loadFilesFromDir from '../../../utils/loadFilesFromDir';

interface SessionStoreSQLQueries extends PGQueries {
  createSessionTable: [[], QueryResultRow];
  sessionTableExists: [[], QueryResultRow | { table_exists: string }];
}

// See https://stackoverflow.com/a/49455609/9788634
const packagePath = path.dirname(
  require.resolve('connect-pg-simple/package.json')
);

const getQueries = async (): Promise<
  Record<keyof SessionStoreSQLQueries, string>
> => {
  const { table: createSessionTable } = await loadFilesFromDir<
    Record<'table', string>
  >(packagePath, ['.pgsql', '.sql']);

  const localQueries = await loadFilesFromDir(__dirname, ['.pgsql', '.sql']);

  return {
    ...localQueries,
    createSessionTable,
  };
};

export { getQueries, SessionStoreSQLQueries };
