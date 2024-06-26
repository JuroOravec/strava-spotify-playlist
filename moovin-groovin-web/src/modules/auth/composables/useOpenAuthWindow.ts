import { inject } from '@vue/composition-api';

import { ConfigKey } from '@/plugins/config';
import openWindow, { WindowFeatures, OpenWindowOptions } from '@/modules/auth/utils/openWindow';
import type { EnvironmentConfig } from '@/plugins/config/config';

interface UseOpenAuthWindow {
  openWindow: typeof openWindow;
  openAuthWindow: (
    provider: string,
    options?: { params?: Record<string, string> } & Pick<OpenWindowOptions, 'onDidCloseWindow'>
  ) => void;
}

const defaultWindowFeats: Partial<WindowFeatures> = {
  width: 300,
  height: 400,
  left: 200,
  top: 200,
  menubar: false,
  toolbar: false,
  location: false,
  status: false,
};

const getAuthUrl = (urlTemplate: string, providerId: string) =>
  urlTemplate.replace(/\$\{provider\}/gi, providerId);

const useOpenAuthWindow = (): UseOpenAuthWindow => {
  const config = inject<EnvironmentConfig>(ConfigKey);

  const openAuthWindow = (
    providerId: string,
    options: { params?: Record<string, string> } & Pick<OpenWindowOptions, 'onDidCloseWindow'> = {}
  ): void => {
    const { params = {}, onDidCloseWindow } = options;

    const authUrl = getAuthUrl(config?.LOGIN_URL ?? '', providerId);

    const urlHelper = new URL(authUrl);
    Object.entries(params).forEach(([key, val]) => urlHelper.searchParams.set(key, val));

    urlHelper.searchParams.set('redirect_url', config?.AUTH_CALLBACK_URL ?? '');

    openWindow(urlHelper.toString(), {
      name: `moovin-groovin-login-${providerId}`,
      windowFeatures: defaultWindowFeats,
      onDidCloseWindow,
    });
  };

  return {
    openWindow,
    openAuthWindow,
  };
};

export default useOpenAuthWindow;
