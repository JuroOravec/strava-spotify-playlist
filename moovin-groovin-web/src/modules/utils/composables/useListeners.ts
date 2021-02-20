import reduce from 'lodash/reduce';

type EventCallback<TArgs extends any[] = any[]> = (...args: TArgs) => void;
type InterceptCallback<TEvent extends string = string, TArgs extends any[] = any[]> = (
  event: TEvent,
  cancelEvent: () => void,
  ...args: TArgs
) => void;

interface UseListeners {
  interceptEvent: <
    TArgs extends any[],
    TEvent extends string,
    T extends InterceptCallback<TEvent, TArgs>
  >(
    event: TEvent,
    onEvent: T
  ) => EventCallback<TArgs>;
  interceptEvents: <T extends InterceptCallback<TEvent>, TEvent extends string>(
    events: TEvent[],
    onEvent: T
  ) => Record<TEvent, EventCallback>;
  reemitPrefixedEvents: <T extends string>(events: T[], prefix: string) => Record<T, EventCallback>;
}

const useListeners = (input: { emit: (event: string, ...args: any[]) => void }): UseListeners => {
  const { emit } = input;

  const interceptEvent = <
    TArgs extends any[],
    TEvent extends string,
    T extends InterceptCallback<TEvent, TArgs>
  >(
    event: TEvent,
    onEvent: T
  ): EventCallback<TArgs> => {
    const interceptor = (...args: TArgs) => {
      let hasCancelledEvent = false;
      const cancelEvent = () => {
        hasCancelledEvent = true;
      };

      onEvent(event, cancelEvent, ...args);

      if (!hasCancelledEvent) emit(event, ...args);
    };
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

  const reemitPrefixedEvents = <T extends string>(
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
    reemitPrefixedEvents,
  };
};

export default useListeners;
