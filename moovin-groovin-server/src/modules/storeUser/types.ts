import type {
  UserTokenModel,
  UserTokenProviderInput,
} from '../storeToken/types';

/** User data */
export interface UserModel {
  /** User Id used throughout this app */
  internalUserId: string;
  nameDisplay?: string;
  nameFamily?: string;
  nameGiven?: string;
  email?: string;
  photo?: string;
  /** Provider that user used for first login */
  loginProvider: UserTokenModel['providerId'];
}

export type UserMeta = Pick<UserModel, 'internalUserId'>;
export type UserInput = UserModel;

export type UserProviderAndEmailInput = UserTokenProviderInput & {
  email: NonNullable<UserModel['email']>;
};

export interface UserStore {
  install: () => Promise<void>;
  close: () => Promise<void>;
  delete: (internalUserIds: string[]) => Promise<(UserMeta | null)[]>;
  get: (internalUserIds: string[]) => Promise<(UserModel | null)[]>;
  getByTokens: (
    data: UserTokenProviderInput[]
  ) => Promise<(UserModel | null)[]>;
  getByTokensOrEmails: (
    data: UserProviderAndEmailInput[]
  ) => Promise<(UserModel | null)[]>;
  insert: (userData: UserInput[]) => Promise<(UserMeta | null)[]>;
}
