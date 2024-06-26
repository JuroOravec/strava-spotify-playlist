import { Client, Pool, QueryResultRow, QueryResult } from 'pg';
import pgFormat from 'pg-format';
import isNil from 'lodash/isNil';
import identity from 'lodash/identity';

import type { OptionalReadonly } from '@moovin-groovin/shared';
import { safeInvoke } from '@moovin-groovin/shared';
import logger from '../logger';
import resolvePgClient, { PGClientOptions } from './resolvePgClient';

type PGStoreOptions = PGClientOptions;
type PGQueryInput = any[];
type PGQueries = Record<string, [PGQueryInput, QueryResultRow]>;
type CustomQueryResult<R extends any = any> = Omit<
  QueryResult<R extends QueryResultRow ? R : QueryResultRow>,
  'rows'
> & {
  rows: R[];
};

/** Base setup for accessing Postgres database  */
class PGStore<TQueries extends PGQueries = PGQueries> {
  pool: Pool | null = null;
  client: Client | null = null;
  queries: Record<keyof TQueries, string> | null = null;
  doneInstalling: Promise<void> | null = null;

  constructor(configOrClient: PGStoreOptions) {
    const { client, pool } = resolvePgClient(configOrClient);
    this.client = client;
    this.pool = pool;

    if (this.pool) {
      this.pool.on('error', async (err) => {
        await this.close();
        throw err;
      });
    }
  }

  getClient(): Pool | Client {
    const client = this.client || this.pool;
    if (!client) {
      throw Error('No client provided to PGStore');
    }
    return client;
  }

  async install(): Promise<void> {
    this.doneInstalling = new Promise(async (res) => {
      const client = this.getClient();
      await client.connect();
      await this.doInstall();
      res();
    });
    return this.doneInstalling;
  }

  async doInstall(): Promise<void> {}

  async close(): Promise<void> {
    await this.doClose();
    const client = this.getClient();

    // .end() may throw if it was called already
    safeInvoke(client.end);
  }

  async doClose(): Promise<void> {}

  async getQuery<TQuery extends keyof TQueries>(
    query: TQuery
  ): Promise<string> {
    assertQueries(this.queries);
    const queryDefinition = this.queries[query];
    if (!queryDefinition) {
      throw Error(`Missing definition for query "${query}"`);
    }

    return queryDefinition;
  }

  async query<
    TQuery extends keyof TQueries,
    TTransform extends any = TQueries[TQuery][1]
  >(
    query: TQuery,
    input?: OptionalReadonly<TQueries[TQuery][0]>,
    map: (val: TQueries[TQuery][1]) => TTransform = identity
  ): Promise<CustomQueryResult<TTransform>> {
    const queryDefinition = await this.getQuery(query);
    const { result: queryText } = safeInvoke(
      () => pgFormat(queryDefinition, input),
      (error) => {
        error.message = 'Failed to prepare query: ' + error.message;
        throw error;
      }
    );

    const client = this.getClient();
    logger.debug(`Running query "${query}"`);
    logger.trace({ queryText });
    const result = await client.query<TQueries[TQuery][1], TQueries[TQuery][0]>(
      queryText
    );
    logger.debug(`Done running query "${query}"`);

    return {
      ...result,
      rows: result.rows.map((row) => map(row)),
    };
  }
}

function assertStore(store?: PGStore | null, storeType = ''): asserts store {
  if (!store) {
    throw Error(`Cannot access${storeType ? ` ${storeType}` : ''} store`);
  }
}

function assertQueries<
  TQueries extends Record<string, string> = Record<string, string>
>(queries: TQueries | null): asserts queries {
  if (isNil(queries)) {
    throw Error('Missing queries definitions');
  }
}

export default PGStore;
export { assertStore };
export type { PGStoreOptions, PGQueries };
