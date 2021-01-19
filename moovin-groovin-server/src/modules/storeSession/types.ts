export interface SessionStore {
  install: () => Promise<void>;
  close: () => Promise<void>;
}

export type StoreSessionEmits = ['storeSession:didInstall', []];
