type EnvironmentConfig = Readonly<{
  AUTH_CALLBACK_URL: string;
  GRAPHQL_URL: string;
  LOGIN_URL: string;
}>;

type ApplicationConfig = Readonly<{
  development: EnvironmentConfig;
  production: EnvironmentConfig;
}>;

const createConfig = (): ApplicationConfig => ({
  development: {
    AUTH_CALLBACK_URL: 'http://localhost:8080/auth/callback',
    GRAPHQL_URL: 'http://localhost:3000/api/v1/graphql',
    LOGIN_URL: 'http://localhost:3000/api/v1/auth/${provider}/login',
  },
  production: {
    AUTH_CALLBACK_URL: 'https://www.moovingroovin.com/auth/callback',
    GRAPHQL_URL: 'https://api.moovingroovin.com/api/v1/graphql',
    LOGIN_URL: 'https://api.moovingroovin.com/api/v1/auth/${provider}/login',
  },
});

export default createConfig;
export type { EnvironmentConfig, ApplicationConfig };
