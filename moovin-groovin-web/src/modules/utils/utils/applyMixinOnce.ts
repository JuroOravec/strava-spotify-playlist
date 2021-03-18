import type { ComponentOptions, VueConstructor } from 'vue';
import { getCurrentInstance } from '@vue/composition-api';

import { safeInvoke } from '@moovin-groovin/shared';

const applyMixinOnce = (vueClass: VueConstructor, mixin: ComponentOptions<Vue>): void => {
  const appliedRoots = new Set<number>();
  if (!mixin.setup) {
    vueClass.mixin(mixin);
    return;
  }

  const wrapperMixin: ComponentOptions<Vue> = {
    ...mixin,
    setup(...args) {
      const rootId = getCurrentInstance()?.root.uid ?? 0;
      if (appliedRoots.has(rootId)) return;
      const { result } = safeInvoke(() => mixin?.setup?.(...args));
      appliedRoots.add(rootId);
      return result ?? {};
    },
  };

  vueClass.mixin(wrapperMixin);
};

export default applyMixinOnce;
