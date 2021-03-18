import 'connect-pg-simple';
import path from 'path';
import type { QueryResultRow } from 'pg';

import type { PGQueries } from '../../../lib/PGStore';
import loadFilesFromDir from '../../../utils/loadFilesFromDir';

type SessionStoreSQLQueries = PGQueries;

// See https://stackoverflow.com/a/49455609/9788634
const packagePath = path.dirname(
  require.resolve('connect-pg-simple/package.json')
);

const getQueries = async (): Promise<
  Record<keyof SessionStoreSQLQueries, string>
> => loadFilesFromDir(__dirname, ['.pgsql', '.sql']);

export { getQueries, SessionStoreSQLQueries };
