import { Client, Pool, PoolClient, PoolConfig } from 'pg';
import PGPool from 'pg-pool';

type PGClientOptions = PoolConfig | Pool | Client;

const isClient = (client: unknown): client is PoolClient | Client =>
  client instanceof Client;

// The class from pg-pool is used because Pool from pg is subclassed on module import
// so there's a possibility of the Pool classes not being identical
const isPool = (pool: unknown): pool is Pool => pool instanceof PGPool;

const resolvePgClient = (
  configOrClient: PGClientOptions
): { client: Client; pool: null } | { client: null; pool: Pool } => {
  if (isClient(configOrClient)) {
    return {
      client: configOrClient,
      pool: null,
    };
  }
  if (isPool(configOrClient)) {
    return {
      client: null,
      pool: configOrClient,
    };
  }
  return {
    client: null,
    pool: new Pool(configOrClient),
  };
};

export { resolvePgClient as default, PGClientOptions };
