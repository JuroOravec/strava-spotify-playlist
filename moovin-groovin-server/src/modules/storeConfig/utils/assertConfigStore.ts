import type { ConfigStore } from '../types';

function assertConfigStore(
  configStore?: ConfigStore | null
): asserts configStore {
  if (!configStore) {
    throw Error(`Cannot access config store`);
  }
}

export default assertConfigStore;
