import type { ViewDirsInput, ViewDirsInputFn } from './types';

interface BaseExternalData {
  root: string;
  viewDirs: ViewDirsInput | ViewDirsInputFn;
}

type BaseData = BaseExternalData;

export { BaseData };
