declare module '*.vue' {
  import { AsyncComponent, ComponentOptions } from 'vue';

  const vueComponent: ComponentOptions<Vue> | typeof Vue | AsyncComponent;
  export default vueComponent;
}
