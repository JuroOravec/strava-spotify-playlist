import localtunnel from 'localtunnel';

import logger from '../../../lib/logger';

type LocaltunnelConfig = localtunnel.TunnelConfig & { port: number };

const createLocaltunnel = async (
  config: LocaltunnelConfig
): Promise<localtunnel.Tunnel> => {
  logger.info(`Creating localtunnel instance`);
  const tunnel = await localtunnel(config);

  logger.info(`Done creating localtunnel instance. Tunnel url: ${tunnel.url}`);

  tunnel.on('close', () => logger.info('Localtunnel instance closed.'));

  return tunnel;
};

export default createLocaltunnel;
export type { LocaltunnelConfig };
