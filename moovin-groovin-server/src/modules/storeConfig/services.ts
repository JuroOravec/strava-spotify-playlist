import logger from '../../lib/logger';
import type { Handlers, ServerModule, Services } from '../../lib/ServerModule';
import type { UserConfig, UserConfigMeta, UserConfigModel } from './types';
import type { StoreConfigData } from './data';
import assertConfigStore from './utils/assertConfigStore';

interface StoreConfigServices extends Services {
  insertUserConfig: (
    internalUserId: string,
    config: Partial<UserConfig>
  ) => Promise<UserConfigMeta | null>;
  insertUserConfigs: (
    data: {
      internalUserId: string;
      config: Partial<UserConfig>;
    }[]
  ) => Promise<(UserConfigMeta | null)[]>;
  getUserConfig: (internalUserId: string) => Promise<UserConfig | null>;
  getUserConfigs: (internalUserIds: string[]) => Promise<(UserConfig | null)[]>;
  getUserConfigWithDefaults: (internalUserId: string) => Promise<UserConfig>;
  getUserConfigsWithDefaults: (
    internalUserIds: string[]
  ) => Promise<UserConfig[]>;
  updateUserConfig: (
    internalUserId: string,
    config: Partial<UserConfig>
  ) => Promise<UserConfigMeta | null>;
  updateUserConfigs: (
    data: {
      internalUserId: string;
      config: Partial<UserConfig>;
    }[]
  ) => Promise<(UserConfigMeta | null)[]>;
}

type ThisModule = ServerModule<StoreConfigServices, Handlers, StoreConfigData>;

const createStoreConfigServices = (): StoreConfigServices => {
  async function insertUserConfig(
    this: ThisModule,
    internalUserId: string,
    config: Partial<UserConfig>
  ): Promise<UserConfigMeta | null> {
    const [response] = await this.services.insertUserConfigs([
      { internalUserId, config },
    ]);
    return response;
  }

  async function insertUserConfigs(
    this: ThisModule,
    configData: {
      internalUserId: string;
      config: Partial<UserConfig>;
    }[]
  ): Promise<(UserConfigMeta | null)[]> {
    if (!configData.length) return [];
    assertConfigStore(this.data.configStore);
    const defaultUserConfig = this.data.userConfig;
    const input = configData.map(
      ({ config, internalUserId }): UserConfigModel => ({
        ...defaultUserConfig,
        ...config,
        internalUserId,
      })
    );
    const responses = await this.data.configStore.insert(input);

    return responses;
  }

  async function getUserConfig(
    this: ThisModule,
    internalUserId: string
  ): Promise<UserConfig | null> {
    const [userConfig = null] = await this.services.getUserConfigs([
      internalUserId,
    ]);
    return userConfig;
  }

  async function getUserConfigs(
    this: ThisModule,
    internalUserIds: string[]
  ): Promise<(UserConfig | null)[]> {
    if (!internalUserIds.length) return [];

    assertConfigStore(this.data.configStore);
    return this.data.configStore.get(internalUserIds);
  }

  async function getUserConfigWithDefaults(
    this: ThisModule,
    internalUserId: string
  ): Promise<UserConfig> {
    const [userConfig] = await this.services.getUserConfigsWithDefaults([
      internalUserId,
    ]);
    return userConfig;
  }

  async function getUserConfigsWithDefaults(
    this: ThisModule,
    internalUserIds: string[]
  ): Promise<UserConfig[]> {
    const configsResponse = await this.services.getUserConfigs(internalUserIds);
    const defaultUserConfig = this.data.userConfig;

    return configsResponse.map(
      (configResponse): UserConfig => ({
        ...defaultUserConfig,
        ...(configResponse ?? {}),
      })
    );
  }

  async function updateUserConfig(
    this: ThisModule,
    internalUserId: string,
    config: Partial<UserConfig>
  ): Promise<UserConfigMeta | null> {
    const [response] = await this.services.updateUserConfigs([
      { internalUserId, config },
    ]);
    return response;
  }

  async function updateUserConfigs(
    this: ThisModule,
    data: {
      internalUserId: string;
      config: Partial<UserConfig>;
    }[]
  ): Promise<(UserConfigMeta | null)[]> {
    if (!data.length) return [];
    assertConfigStore(this.data.configStore);
    return this.data.configStore.update(
      data.map(({ internalUserId, config }) => ({ ...config, internalUserId }))
    );
  }

  return {
    insertUserConfig,
    insertUserConfigs,
    getUserConfig,
    getUserConfigs,
    getUserConfigWithDefaults,
    getUserConfigsWithDefaults,
    updateUserConfig,
    updateUserConfigs,
  };
};

export default createStoreConfigServices;
export type { StoreConfigServices };
