import type { Services } from '../../../lib/ServerModule';
import createPassportServices, { OAuthPassportServices } from './passport';

type OAuthServices = Services & OAuthPassportServices;

const createOAuthServices = (): OAuthServices => ({
  ...createPassportServices(),
});

export { createOAuthServices as default, OAuthServices };
