import fs from 'fs';

import logger from './index';

const readFileSync = ((path: string, ...args: any[]) => {
  logger.debug(`Reading file "${path}"`);
  const content = fs.readFileSync(path, ...args);
  logger.debug(`Done reading file "${path}"`);
  return content;
}) as typeof fs.readFileSync;

export default {
  readFileSync,
};
