import isNil from 'lodash/isNil';

interface WindowFeatures {
  left: number;
  top: number;
  width: number;
  height: number;
  menubar: boolean;
  toolbar: boolean;
  location: boolean;
  status: boolean;
  resizable: boolean;
  scrollbars: boolean;
  noopener: boolean;
  /** Does not seem to work on Chrome v87 on MacOS v10 */
  // noreferrer: boolean;
}

interface OpenWindowOptions {
  name?: string;
  windowFeatures?: Partial<WindowFeatures>;
  onDidCloseWindow?: () => void;
}

const booleanWindowFeats: (keyof WindowFeatures)[] = [
  'menubar',
  'toolbar',
  'location',
  'status',
  'resizable',
  'scrollbars',
  'noopener',
];

const serializeWindowFeatures = (windowFeats: Partial<WindowFeatures> = {}): string =>
  Object.entries(windowFeats)
    .map(([key, value]) => {
      const usedValue = booleanWindowFeats.includes(key as keyof WindowFeatures)
        ? value
          ? 1
          : 0
        : value;
      return isNil(usedValue) ? key : `${key}=${usedValue}`;
    })
    .join(',');

const openWindow = (url: string, options: OpenWindowOptions = {}): void => {
  const { name, windowFeatures, onDidCloseWindow } = options;

  const { noopener, ...windowFeatsOverrides } = windowFeatures ?? {};
  const usedWindowFeats = serializeWindowFeatures(windowFeatsOverrides);

  // Delay loading of taret url until we remove the opener if `noopener`
  // See https://stackoverflow.com/questions/46147949/using-rel-noopener-in-window-open
  const newWindow = window.open('', name, usedWindowFeats);
  if (!newWindow) return;
  if (noopener) {
    newWindow.opener = null;
  }

  // Listen until the window closes
  // See https://stackoverflow.com/a/48240128/9788634
  if (onDidCloseWindow) {
    const timer = setInterval(() => {
      if (!newWindow.closed) return;
      clearInterval(timer);
      onDidCloseWindow();
    }, 1000);
  }

  // Trigger the target url in child window
  newWindow.location.href = url;
};

export default openWindow;
export type { WindowFeatures, OpenWindowOptions };
