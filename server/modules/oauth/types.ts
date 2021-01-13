import type { RequestHandler } from 'express';

import type {
  OAuthCreator,
  ServerModules,
  ModuleContext,
} from '../../lib/ServerModule';
import type { ServerModuleName } from '../../types';
import type { StoreTokenModule } from '../storeToken';
import type { AuthToken } from '../storeToken/types';
import type { StoreUserModule } from '../storeUser';
import type { UserModel } from '../storeUser/types';

export type OAuthOptions = {
  providerId: string;
  /** Whether the provider can be used to log user in */
  isLoginProvider?: boolean;
  oauth: OAuthCreator;
  loginHandler: RequestHandler;
  callbackHandler: RequestHandler;
  validateScope?: () => boolean;
};

export type OAuthInput = OAuthOptions | OAuthOptions[];

export type OAuthInputFn<TModules extends ServerModules = ServerModules> = (
  ctx: ModuleContext<TModules>
) => OAuthInput;

export interface OAuthDeps extends ServerModules {
  [ServerModuleName.STORE_USER]: StoreUserModule;
  [ServerModuleName.STORE_TOKEN]: StoreTokenModule;
}

export interface PassportUser {
  user: Omit<UserModel, 'internalUserId'> & {
    internalUserId: UserModel['internalUserId'] | null;
  };
  token: AuthToken;
}
