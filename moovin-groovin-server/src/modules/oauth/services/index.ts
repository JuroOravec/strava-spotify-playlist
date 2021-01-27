import createPassportServices, { OAuthPassportServices } from './passport';

type OAuthServices = OAuthPassportServices;

const createOAuthServices = (): OAuthServices => ({
  ...createPassportServices(),
});

export { createOAuthServices as default, OAuthServices };
