import type { UserStore } from '../types';

function assertUserStore(userStore?: UserStore | null): asserts userStore {
  if (!userStore) {
    throw Error(`Cannot access user store`);
  }
}

export default assertUserStore;
