import logger from '../../lib/logger';
import type { Handlers, ServerModule, Services } from '../../lib/ServerModule';
import type { UserConfig, UserConfigMeta } from './types';
import type { StoreConfigData } from './data';
import assertConfigStore from './utils/assertConfigStore';

interface StoreConfigServices extends Services {
  createUserConfig: (
    internalUserId: string,
    config: UserConfig
  ) => Promise<UserConfigMeta | null>;
  createUserConfigs: (
    data: {
      internalUserId: string;
      config: UserConfig;
    }[]
  ) => Promise<(UserConfigMeta | null)[]>;
  getUserConfig: (internalUserId: string) => Promise<UserConfig>;
  getUserConfigs: (internalUserIds: string[]) => Promise<UserConfig[]>;
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
  async function createUserConfig(
    this: ThisModule,
    internalUserId: string,
    config: UserConfig
  ): Promise<UserConfigMeta | null> {
    const [response] = await this.services.createUserConfigs([
      { internalUserId, config },
    ]);
    return response;
  }

  async function createUserConfigs(
    this: ThisModule,
    configData: {
      internalUserId: string;
      config: UserConfig;
    }[]
  ): Promise<(UserConfigMeta | null)[]> {
    if (!configData.length) return [];
    assertConfigStore(this.data.configStore);
    const defaultUserConfig = this.data.userConfig;
    const input = configData.map(({ config, internalUserId }) => ({
      ...defaultUserConfig,
      ...config,
      internalUserId,
    }));
    const responses = await this.data.configStore.insert(input);

    return responses;
  }

  async function getUserConfig(
    this: ThisModule,
    internalUserId: string
  ): Promise<UserConfig> {
    const [userConfig] = await this.services.getUserConfigs([internalUserId]);
    return userConfig;
  }

  async function getUserConfigs(
    this: ThisModule,
    internalUserIds: string[]
  ): Promise<UserConfig[]> {
    if (!internalUserIds.length) return [];
    assertConfigStore(this.data.configStore);
    const configsResponse = await this.data.configStore.get(internalUserIds);
    const defaultUserConfig = this.data.userConfig;

    return configsResponse.map((configResponse) => {
      if (!configResponse) return { ...defaultUserConfig };
      const { internalUserId: _, ...config } = configResponse;
      return { ...defaultUserConfig, ...config };
    });
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
    createUserConfig,
    createUserConfigs,
    getUserConfig,
    getUserConfigs,
    updateUserConfig,
    updateUserConfigs,
  };
};

export { createStoreConfigServices as default, StoreConfigServices };
