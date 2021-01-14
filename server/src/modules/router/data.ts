import type { RouterInput, RoutersFn } from './types';

interface RouterExternalData {
  routers: RouterInput | RoutersFn<any>;
  rootPath: string;
}

type RouterData = RouterExternalData;

export { RouterData, RouterExternalData };
