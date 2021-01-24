/* eslint-disable no-console */

import { register } from 'register-service-worker';

// Note: This is not a Vue plugin, but it is a pluggable feature
const registerServiceWorker = (input: { baseUrl?: string }): void => {
  const { baseUrl } = input;

  if (!baseUrl) {
    console.warn('Skipping setting up service workers. No base URL defined.');
    return;
  }

  const normBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  register(`${normBaseUrl}service-worker.js`, {
    ready(): void {
      console.log(
        'App is being served from cache by a service worker.\n' +
          'For more details, visit https://goo.gl/AFskqB'
      );
    },
    registered(): void {
      console.log('Service worker has been registered.');
    },
    cached(): void {
      console.log('Content has been cached for offline use.');
    },
    updatefound(): void {
      console.log('New content is downloading.');
    },
    updated(): void {
      console.log('New content is available; please refresh.');
    },
    offline(): void {
      console.log('No internet connection found. App is running in offline mode.');
    },
    error(error): void {
      console.error('Error during service worker registration:', error);
    },
  });
};

export default registerServiceWorker;
