import fsp from 'fs/promises';

import logger from './index';

const readdir = (async (path: string, ...args: any[]) => {
  logger.debug(`Reading dir "${path}"`);
  const result = await fsp.readdir(path, ...args);
  logger.debug(`Done reading dir "${path}"`);
  return result;
}) as typeof fsp.readdir;

const readFile = (async (path: string, ...args: any[]) => {
  logger.debug(`Reading file "${path}"`);
  const result = await fsp.readFile(path, ...args);
  logger.debug(`Done reading file "${path}"`);
  return result;
}) as typeof fsp.readFile;

const stat = (async (path: string) => {
  logger.debug(`Getting stat for file "${path}"`);
  const result = await fsp.stat(path);
  logger.debug(`Getting stat for file "${path}"`);
  return result;
}) as typeof fsp.stat;

const writeFile = (async (path: string, ...args) => {
  logger.debug(`Writing to file "${path}"`);
  const result = await fsp.writeFile(path, ...args);
  logger.debug(`Done writing to file "${path}"`);
  return result;
}) as typeof fsp.writeFile;

export default {
  readdir,
  readFile,
  stat,
  writeFile,
};
