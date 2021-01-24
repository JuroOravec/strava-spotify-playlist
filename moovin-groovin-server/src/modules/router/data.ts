import type { RouterInput, RouterInputFn } from './types';

interface RouterExternalData {
  routers: RouterInput | RouterInputFn<any>;
  rootPath: string;
}

type RouterData = RouterExternalData;

export { RouterData, RouterExternalData };
