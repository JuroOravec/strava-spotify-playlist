import Vue, { ComponentOptions, VueConstructor } from 'vue';
import { ref, unref, Ref, UnwrapRef } from '@vue/composition-api';
import isNil from 'lodash/isNil';
import memoize from 'lodash/memoize';
import { VSnackbar } from 'vuetify/lib';

import useRefRich, { RefSetter } from '@/modules/utils-reactivity/composables//useRefRich';
import type { RefReadonly } from '@/modules/utils-reactivity/composables/useRefReadonly';
import wait from '../utils/wait';

type VueComponent = VueConstructor<Vue> | Vue | ComponentOptions<any, any, any, any, any, any>;

enum NotifType {
  DEFAULT = 'default',
  CONFIRM = 'confirm',
  ERROR = 'error',
}

/* eslint-disable-next-line @typescript-eslint/ban-types */
type NotifData = object;

type TriggerOptions<T extends NotifData = NotifData> =
  | {
      notifType?: undefined;
      component?: VueComponent;
      attrs?: UnwrapRef<T>;
    }
  | {
      notifType?: NotifType;
      component?: undefined;
      attrs?: UnwrapRef<T>;
    };

interface UseNotifSnackbar<T extends NotifData = NotifData> {
  isNotifActive: Ref<boolean>;
  setIsNotifActive: RefSetter<boolean>;
  notifComponent: Ref<VueComponent | null>;
  setNotifComponent: RefSetter<VueComponent | null>;
  addNotifComponents: (componentsByNotifType: Partial<Record<NotifType, VueComponent>>) => void;
  setNotifType: RefSetter<NotifType | null>;
  notifAttrs: RefReadonly<T>;
  triggerNotif: (options?: TriggerOptions<T>) => void;
  queueNotif: (options?: TriggerOptions<T>) => void;
  nextNotif: () => void;
  cancelNotif: () => void;
  clearNotifQueue: () => void;
}

const useNotifSnackbar = <T extends NotifData = NotifData>(): UseNotifSnackbar<T> => {
  const notifComponentsByType: Partial<Record<NotifType, VueComponent>> = {
    default: VSnackbar,
  };
  const { ref: isNotifActive, setter: setIsNotifActive, addWatcher: onIsNotifActive } = useRefRich({
    value: false,
  });
  const { ref: notifComponent, setter: setNotifComponent } = useRefRich<VueComponent | null>({
    value: notifComponentsByType.default,
  });
  const { setter: setNotifType, addWatcher: onNotifType } = useRefRich<NotifType | null>();
  const { setter: setNotifAttrs, readonly: readonlyNotifAttrs } = useRefRich<T>();
  const { ref: notifQueue, setter: setNotifQueue } = useRefRich<TriggerOptions<T>[]>({ value: [] });

  const addNotifComponents = (
    componentsByNotifType: Partial<Record<NotifType, VueComponent>>
  ): void => {
    Object.assign(notifComponentsByType, componentsByNotifType);
  };

  onNotifType((newNotifType) => {
    const newComponent =
      (newNotifType && notifComponentsByType[newNotifType]) || notifComponentsByType.default;
    if (newComponent) setNotifComponent(newComponent);
  });

  const triggerNotif = (options: TriggerOptions<T> = {}): void => {
    const { component, notifType, attrs } = options;

    if (notifType) setNotifType(notifType);
    if (component) setNotifComponent(component);
    if (!isNil(attrs)) setNotifAttrs(attrs);
    setIsNotifActive(true);
  };

  const queueNotif = (options: TriggerOptions<T> = {}): void => {
    if (!unref(isNotifActive) && !unref(notifQueue).length) {
      triggerNotif(options);
      return;
    }
    unref(notifQueue).push(options as any);
  };

  const isCancelingNotif = ref(false);
  const cancelNotif = async (): Promise<void> => {
    if (unref(isCancelingNotif)) return;
    isCancelingNotif.value = true;
    await wait(200);
    if (unref(isNotifActive)) setIsNotifActive(false);
    isCancelingNotif.value = false;
  };

  const clearNotifQueue = (): void => {
    setNotifQueue([]);
    cancelNotif();
  };

  const nextNotif = async (): Promise<void> => {
    const nextNotifData = unref(notifQueue).shift();
    if (!nextNotifData) return;
    await cancelNotif();
    triggerNotif(nextNotifData as TriggerOptions<T>);
  };

  onIsNotifActive((newIsNotifActive) => {
    if (!newIsNotifActive && unref(notifQueue).length) {
      nextNotif();
    }
  });

  return {
    isNotifActive,
    setIsNotifActive,
    notifComponent: notifComponent as Ref<VueComponent | null>,
    addNotifComponents,
    setNotifComponent,
    setNotifType,
    notifAttrs: readonlyNotifAttrs,
    triggerNotif,
    nextNotif,
    cancelNotif,
    queueNotif,
    clearNotifQueue,
  };
};

export default memoize(useNotifSnackbar);
export { NotifType, TriggerOptions, NotifData };
