import type { RequestHandler } from 'express';

import type AppServerModules from '../../types/AppServerModules';
import type {
  OAuthCreator,
  AnyServerModules,
  ModuleContext,
} from '../../lib/ServerModule';
import type { ServerModuleName } from '../../types';
import type { AuthToken } from '../storeToken/types';
import type { UserModel } from '../storeUser/types';

export type OAuthOptions = {
  providerId: string;
  /** Whether the provider can be used to log user in */
  isAuthProvider?: boolean;
  oauth: OAuthCreator;
  loginHandler: RequestHandler;
  callbackHandler: RequestHandler;
  validateScope?: () => boolean;
};

export type OAuthInput = OAuthOptions | OAuthOptions[];

export type OAuthInputFn<
  TModules extends AnyServerModules = AnyServerModules
> = (ctx: ModuleContext<TModules>) => OAuthInput;

export type OAuthDeps = Pick<
  AppServerModules,
  | ServerModuleName.HOST
  | ServerModuleName.STORE_USER
  | ServerModuleName.STORE_TOKEN
  | ServerModuleName.ANALYTICS
>;

export interface PassportUser {
  user: Omit<UserModel, 'internalUserId'> & {
    internalUserId: UserModel['internalUserId'] | null;
  };
  token: AuthToken;
}
