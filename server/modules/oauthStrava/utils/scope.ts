import fromPairs from 'lodash/fromPairs';

import { PermissionScope } from '../types';

interface ScopesReadable {
  canReadPublicActivities: boolean;
  canReadPrivateActivities: boolean;
  canWriteToActivities: boolean;
  canReadPublicData: boolean;
}

interface GetScopesInfo extends ScopesReadable {
  scopes: PermissionScope[];
}

const scopeReadableMap: Record<PermissionScope, keyof ScopesReadable> = {
  [PermissionScope.PROFILE_READ_PUBLIC]: 'canReadPublicData',
  [PermissionScope.ACTIVITY_READ_PUBLIC]: 'canReadPublicActivities',
  [PermissionScope.ACTIVITY_READ_PRIVATE]: 'canReadPrivateActivities',
  [PermissionScope.ACTIVITY_WRITE]: 'canWriteToActivities',
};

const allScopes = new Set(Object.values(PermissionScope));

const isScope = (scope: string): scope is PermissionScope =>
  allScopes.has(scope as PermissionScope);

const formatScopes = (scopes: PermissionScope[]): string => scopes.join(',');

const parseScopes = (scopes: string): PermissionScope[] =>
  scopes.split(',').filter(isScope);

const getScopesInfo = (scopes: string | PermissionScope[]): GetScopesInfo => {
  const normScopes = typeof scopes === 'string' ? parseScopes(scopes) : scopes;

  const readableScopes = (fromPairs(
    Object.values(scopeReadableMap).map((key) => [key, false])
  ) as unknown) as ScopesReadable;

  normScopes.forEach((scope) => {
    const scopeKey = scopeReadableMap[scope];
    if (scopeKey) readableScopes[scopeKey] = true;
  });

  return {
    ...readableScopes,
    scopes: normScopes,
  };
};

export { formatScopes, parseScopes, getScopesInfo };
