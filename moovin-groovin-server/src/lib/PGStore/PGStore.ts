import {
  Client,
  Pool,
  PoolConfig,
  PoolClient,
  QueryResultRow,
  QueryResult,
} from 'pg';
import PGPool from 'pg-pool';
import pgFormat from 'pg-format';
import isNil from 'lodash/isNil';
import identity from 'lodash/identity';

import type { OptionalReadonly } from '../../types';
import { safeInvoke } from '../../utils/safeInvoke';
import logger from '../logger';

type PGStoreOptions = PoolConfig | Pool | Client;
type PGQueryInput = any[];
type PGQueries = Record<string, [PGQueryInput, QueryResultRow]>;
type CustomQueryResult<R extends any = any> = Omit<
  QueryResult<R extends QueryResultRow ? R : QueryResultRow>,
  'rows'
> & {
  rows: R[];
};

const isClient = (client: unknown): client is PoolClient | Client =>
  client instanceof Client;

// The class from pg-pool is used because Pool from pg is subclassed on module import
// so there's a possibility of the Pool classes not being identical
const isPool = (pool: unknown): pool is Pool => pool instanceof PGPool;

/** Base setup for accessing Postgres database  */
class PGStore<TQueries extends PGQueries = PGQueries> {
  pool: Pool | null = null;
  client: Client | null = null;
  queries: Record<keyof TQueries, string> | null = null;
  doneInstalling: Promise<void> | null = null;

  constructor(configOrClient: PGStoreOptions) {
    if (isClient(configOrClient)) {
      this.client = configOrClient;
      this.pool = null;
    } else if (isPool(configOrClient)) {
      this.client = null;
      this.pool = configOrClient;
    } else {
      this.pool = new Pool(configOrClient);
    }

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
    const { result: queryText, error } = safeInvoke(() =>
      pgFormat(queryDefinition, input)
    );
    if (isNil(queryText) || error) {
      if (!error) {
        throw Error('Failed to prepare query');
      } else {
        error.message = 'Failed to prepare query: ' + error.message;
        throw error;
      }
    }

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

export { PGStore as default, PGStoreOptions, PGQueries, assertStore };
