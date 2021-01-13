import localtunnel from 'localtunnel';

import logger from './logger';

const createLocaltunnel = async (
  config: localtunnel.TunnelConfig & { port: number }
): Promise<localtunnel.Tunnel> => {
  const tunnel = await localtunnel(config);

  logger.info(`Localtunnel instance created with url: ${tunnel.url}`);

  tunnel.on('close', () => {
    logger.info('Localtunnel instance closed.');
  });

  return tunnel;
};

export default createLocaltunnel;
