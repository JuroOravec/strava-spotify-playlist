import type { GraphQLError } from 'graphql';
import type { UseMutationReturn } from '@vue/apollo-composable';

import type { OptionalReadonly } from '@moovin-groovin/shared/src/types/optionals';
import useNotifSnackbar, { TriggerOptions, NotifType, NotifData } from './useNotifSnackbar';

type MutationNotif<
  T extends NotifData = NotifData,
  TArgs extends OptionalReadonly<any[]> = any[]
> = TriggerOptions<T> | ((...args: TArgs) => TriggerOptions<T>) | false;

const getDefaultErrorNotif = (errors: OptionalReadonly<Error[]>): TriggerOptions => ({
  notifType: NotifType.ERROR,
  attrs: {
    content: `Request failed. Error: ${errors[0].message}`,
  },
});

const getDefaultSuccessNotif = (): TriggerOptions => ({
  notifType: NotifType.CONFIRM,
  attrs: {
    content: 'Success.',
  },
});

const resolveNotif = <TArgs extends any[]>(
  notifA?: MutationNotif<any, TArgs>,
  notifB?: MutationNotif<any, TArgs>,
  args: TArgs = ([] as unknown) as TArgs
) => {
  const notif = notifA || notifA === false ? notifA : notifB;

  const resolvedNotif = (typeof notif === 'function' ? notif(...args) : notif) as Exclude<
    MutationNotif<any, TArgs>,
    (...args: any[]) => any
  >;

  return resolvedNotif;
};

/** Wraps useMutation to trigger notification on success and errors */
const useMutationWithNotif = <
  T extends (...args: any[]) => UseMutationReturn<any, any>,
  TNotifData extends NotifData
>(
  mutation: T,
  options: {
    notifOnSuccess?: MutationNotif<
      TNotifData,
      [ReturnType<T> extends UseMutationReturn<infer U, any> ? U : any]
    >;
    notifOnError?: MutationNotif<TNotifData, Error[][]>;
    passError?: boolean;
  } = {}
): ((...args: Parameters<T>) => ReturnType<T>) => {
  const { notifOnSuccess, notifOnError, passError = false } = options;

  const mutationWrapper = (...args: Parameters<T>): ReturnType<T> => {
    const { queueNotif } = useNotifSnackbar();
    const composableReturn = mutation(...args) as ReturnType<T>;

    const mutate = (...args: Parameters<typeof composableReturn.mutate>) =>
      composableReturn
        .mutate(...args)
        .then((res) => {
          const { errors } = res;

          if (errors?.length) {
            const notif = resolveNotif(notifOnError, getDefaultErrorNotif, [
              errors as GraphQLError[],
            ]);
            if (notif) queueNotif(notif);
            return res;
          }

          if (notifOnSuccess !== false) {
            const notif = resolveNotif(notifOnSuccess, getDefaultSuccessNotif, [res as any]);
            if (notif) queueNotif(notif as any);
            return res;
          }
        })
        .catch((err: Error) => {
          if (err) {
            const notif = resolveNotif(notifOnError, getDefaultErrorNotif, [[err]]);
            if (notif) queueNotif(notif);
          }

          if (passError) {
            throw err;
          }
        });

    return { ...composableReturn, mutate };
  };

  return mutationWrapper;
};

export default useMutationWithNotif;
