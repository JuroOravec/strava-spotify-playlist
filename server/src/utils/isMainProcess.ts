import cluster from 'cluster';
import isNil from 'lodash/isNil';

/**
 * Determine whether the process the node script is running in
 * is the main process.
 *
 * Compatible with Node's cluster and pm2 packages.
 *
 * See https://stackoverflow.com/a/63214532/9788634
 * and https://nodejs.org/api/cluster.html#cluster_cluster
 */
const isMainProcess = (): boolean =>
  isNil(process.env.NODE_APP_INSTANCE)
    ? cluster.isMaster
    : process.env.NODE_APP_INSTANCE === '0';

export default isMainProcess;
