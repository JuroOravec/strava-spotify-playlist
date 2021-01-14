const resolveProviderUrl = (
  callbackUrlRoot: string,
  provider: string
): string => {
  let callbackUrl = callbackUrlRoot;
  callbackUrl += callbackUrl.endsWith('/') ? '' : '/';
  callbackUrl += `${provider}`;
  return callbackUrl;
};

const resolveProviderLoginUrl = (
  callbackUrlRoot: string,
  provider: string
): string => `${resolveProviderUrl(callbackUrlRoot, provider)}/login`;

const resolveProviderCallbackUrl = (
  callbackUrlRoot: string,
  provider: string
): string => `${resolveProviderUrl(callbackUrlRoot, provider)}/callback`;

export { resolveProviderLoginUrl, resolveProviderCallbackUrl };
