import { inject } from '@vue/composition-api';

import { ConfigKey } from '@/plugins/config';
import openWindow, { WindowFeatures } from '@/modules/auth/utils/openWindow';
import useCurrentUser from './useCurrentUser';
import { EnvironmentConfig } from '@/plugins/config/config';

interface UseOpenAuthWindow {
  openWindow: typeof openWindow;
  openAuthWindow: (provider: AuthProviders) => void;
}

enum AuthProviders {
  FACEBOOK = 'facebook',
  GOOGLE = 'google',
  STRAVA = 'strava',
  SPOTIFY = 'spotify',
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

const getAuthUrl = (urlTemplate: string, provider: AuthProviders) => urlTemplate.replace(/$\{provider\}/gi, provider);

const useOpenAuthWindow = (): UseOpenAuthWindow => {
  const config = inject<EnvironmentConfig>(ConfigKey);

  const { refetch: refetchUser } = useCurrentUser();

  const openAuthWindow = (
    provider: AuthProviders,
    options: { params?: Record<string, string> } = {}
  ): void => {
    const { params = {} } = options;

    const authUrl = getAuthUrl(config?.LOGIN_URL ?? '', provider);

    const urlHelper = new URL(authUrl);
    Object.entries(params).forEach(([key, val]) => urlHelper.searchParams.set(key, val));

    urlHelper.searchParams.set('redirect_url', config?.AUTH_CALLBACK_URL ?? '');

    openWindow(urlHelper.toString(), {
      name: `moovin-groovin-login-${provider}`,
      windowFeatures: defaultWindowFeats,
      onDidCloseWindow: refetchUser,
    });
  };

  return {
    openWindow,
    openAuthWindow,
  };
};

export default useOpenAuthWindow;
export { AuthProviders };
