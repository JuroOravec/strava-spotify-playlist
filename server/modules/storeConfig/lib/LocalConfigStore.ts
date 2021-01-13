import type {
  ConfigStore,
  UserConfigModel,
  UserConfigInput,
  UserConfigMeta,
  UserConfigUpdateInput,
} from '../types';

class LocalConfigStore implements ConfigStore {
  /** User.id -> UserConfig */
  private store = new Map<string, UserConfigModel>();

  async install(): Promise<void> {}

  async get(internalUserIds: string[]): Promise<(UserConfigModel | null)[]> {
    return internalUserIds.map(
      (internalUserId) => this.store.get(internalUserId) || null
    );
  }

  async insert(configs: UserConfigInput[]): Promise<(UserConfigMeta | null)[]> {
    return configs.map(
      (config): UserConfigMeta => {
        this.store.set(config.internalUserId, { ...config });
        return { internalUserId: config.internalUserId };
      }
    );
  }

  async update(
    configs: UserConfigUpdateInput[]
  ): Promise<(UserConfigMeta | null)[]> {
    return configs.map((config) => {
      if (!this.store.has(config.internalUserId)) return null;

      this.store.delete(config.internalUserId);
      return { internalUserId: config.internalUserId };
    });
  }

  async close(): Promise<void> {
    this.store.clear();
  }
}

export default LocalConfigStore;
