import type { Ref } from '@vue/composition-api';

type OptionalRef<T = any> = Ref<T> | T;

export default OptionalRef;
