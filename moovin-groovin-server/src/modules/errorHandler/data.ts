import type { Handlers } from '@sentry/node';
import type { SentryInput, SentryInputFn } from './types';

interface ErrorHandlerExternalData {
  sentry: SentryInput | SentryInputFn;
  sentryRequestHandler: Handlers.RequestHandlerOptions;
}

type ErrorHandlerData = ErrorHandlerExternalData;

export { ErrorHandlerData, ErrorHandlerExternalData };
