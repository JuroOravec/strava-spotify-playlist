import createPassportServices, { OAuthPassportServices } from './passport';

type OAuthServices = OAuthPassportServices;

const createOAuthServices = (): OAuthServices => ({
  ...createPassportServices(),
});

export default createOAuthServices;
export type { OAuthServices };
