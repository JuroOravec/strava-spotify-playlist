import openWindow, { WindowFeatures } from '@/modules/auth/utils/openWindow';

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

const CALLBACK_URL = 'http://localhost:8080/auth/callback';

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

const getAuthUrl = (provider: AuthProviders) =>
  `https://api.moovingroovin.com/api/v1/auth/${provider}/login`;

const useOpenAuthWindow = (): UseOpenAuthWindow => {
  const openAuthWindow = (provider: AuthProviders): void => {
    const authUrl = getAuthUrl(provider);

    const urlHelper = new URL(authUrl);
    urlHelper.searchParams.set('redirect_url', CALLBACK_URL);

    openWindow(urlHelper.toString(), {
      name: `moovin-groovin-login-${provider}`,
      windowFeatures: defaultWindowFeats,
      // TODO: Replace this with a fetch for user data
      onDidCloseWindow: () => location.reload(),
    });
  };

  return {
    openWindow,
    openAuthWindow,
  };
};

export { useOpenAuthWindow as default, AuthProviders };
