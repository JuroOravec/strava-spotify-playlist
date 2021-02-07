import reduce from 'lodash/reduce';

type EventCallback = (...args: any[]) => void;
type InterceptCallback<TEvent extends string = string> = (
  event: TEvent,
  cancelEvent: () => void,
  ...args: any[]
) => void;

interface UseListeners {
  interceptEvent: <T extends InterceptCallback<TEvent>, TEvent extends string>(
    event: TEvent,
    onEvent: T
  ) => EventCallback;
  interceptEvents: <T extends InterceptCallback<TEvent>, TEvent extends string>(
    events: TEvent[],
    onEvent: T
  ) => Record<TEvent, EventCallback>;
  prefixEvents: <T extends string>(events: T[], prefix: string) => Record<T, EventCallback>;
}

const useListeners = (input: { emit: (event: string, ...args: any[]) => void }): UseListeners => {
  const { emit } = input;

  const interceptEvent = <T extends InterceptCallback<TEvent>, TEvent extends string>(
    event: TEvent,
    onEvent: T
  ): EventCallback => {
    const interceptor = ((...args: any[]) => {
      let hasCancelledEvent = false;
      const cancelEvent = () => {
        hasCancelledEvent = true;
      };

      onEvent(event, cancelEvent, ...args);

      if (!hasCancelledEvent) emit(event, ...args);
    }) as T;
    return interceptor;
  };

  const interceptEvents = <T extends InterceptCallback<TEvent>, TEvent extends string>(
    events: TEvent[],
    onEvent: T
  ): Record<TEvent, EventCallback> => {
    const interceptors = reduce(
      events,
      (agg, event) => {
        agg[event] = interceptEvent(event, onEvent);
        return agg;
      },
      {} as Record<TEvent, EventCallback>
    );
    return interceptors;
  };

  const prefixEvents = <T extends string>(
    events: T[],
    prefix: string
  ): Record<T, EventCallback> => {
    const listeners = reduce(
      events,
      (agg, eventName) => {
        const onEventForwarder: EventCallback = (...args: any[]) => {
          emit(`${prefix}${eventName}`, ...args);
        };
        agg[eventName] = onEventForwarder;
        return agg;
      },
      {} as Record<string, EventCallback>
    );

    return listeners;
  };

  return {
    interceptEvent,
    interceptEvents,
    prefixEvents,
  };
};

export default useListeners;
