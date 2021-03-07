<template>
  <component
    :is="confirmDialog"
    v-model="dialogIsOpen"
    v-bind="$attrs"
    class="ConfirmDialogGuard"
    v-on="{
      ...$listeners,
      ...dialogEventListeners,
    }"
  >
    <template #activator="activatorProps">
      <slot name="default" v-bind="activatorProps" />
    </template>

    <template #default="slotProps">
      <slot name="dialog" v-bind="slotProps" />
    </template>

    <!-- Pass on all named slots -->
    <slot v-for="slot in getForwardedSlots($slots)" :slot="slot" :name="slot" />

    <!-- Pass on all scoped slots -->
    <template v-for="slot in getForwardedSlots($scopedSlots)" :slot="slot" slot-scope="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </component>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  ref,
  toRefs,
  unref,
  watch,
  PropType,
  Ref,
} from '@vue/composition-api';
import type { NavigationGuardNext } from 'vue-router';

import useRouteGuard from '@/plugins/routeGuard/useRouteGuard';
import useListeners from '@/modules/utils/composables/useListeners';
import ConfirmDialog from './ConfirmDialog.vue';

const OVERRIDEN_SLOTS = ['default', 'activator'];

const ConfirmDialogGuard = defineComponent({
  name: 'ConfirmDialogGuard',
  inheritAttrs: false,
  props: {
    confirmDialog: { type: Object, required: false, default: () => ConfirmDialog },
    openOnRouteLeave: { type: Boolean, required: false, default: false },
    pauseNavigation: { type: Boolean, required: false, default: false },
    confirmEvents: {
      type: Array as PropType<string[]>,
      required: false,
      default: () => ['confirm'],
    },
    cancelEvents: {
      type: Array as PropType<string[]>,
      required: false,
      default: () => ['cancel'],
    },
  },
  setup(props, { emit }) {
    const { openOnRouteLeave, confirmEvents, cancelEvents, pauseNavigation } = toRefs(props);

    const dialogIsOpen = ref(false);
    const routeGuardNext: Ref<NavigationGuardNext | null> = ref(null);
    const navigationOnUnpause: Ref<(() => void) | null> = ref(null);

    const { interceptEvents } = useListeners({ emit });
    const { beforeRouteLeave } = useRouteGuard();

    const getForwardedSlots = (slots: Record<string, unknown>): string[] =>
      Object.keys(slots).filter((slotName) => !OVERRIDEN_SLOTS.includes(slotName));

    const stopRouteGuard = beforeRouteLeave((to, from, next) => {
      if (!unref(openOnRouteLeave)) {
        navigationOnUnpause.value = () => next();
        return;
      }

      // Defer route change until user confirms the exit. `next` can be called multiple times.
      next(false);
      dialogIsOpen.value = true;

      // Keep ref to `next` so we can trigger it after user confirms navigation change
      routeGuardNext.value = next;
    });

    const dialogEventListeners = computed(() =>
      interceptEvents(
        [...unref(confirmEvents), ...unref(cancelEvents), 'input'],
        (event, cancelEvent, dialogOpen) => {
          // Navigation confirmed
          if (unref(confirmEvents).includes(event)) {
            const next = unref(routeGuardNext);
            navigationOnUnpause.value = next ? () => next() : null;
            routeGuardNext.value = null;
          }

          // Navigation cancelled - discard ref to `next` so we won't accidentally trigger it
          if (unref(cancelEvents).includes(event) || (event === 'input' && !dialogOpen)) {
            routeGuardNext.value = null;
          }
        }
      )
    );

    watch(
      [pauseNavigation, navigationOnUnpause] as const,
      (newVals) => {
        const [newPauseNavigation, newNavigationOnUnpause] = newVals ?? [];

        if (newPauseNavigation) return;

        // Navigation became unpaused or updated
        newNavigationOnUnpause?.();
        navigationOnUnpause.value = null;
      },
      { immediate: true }
    );

    // Note: For the guard to clean up after itself, we assume that `next()` triggers `onBeforeUnmount`
    onBeforeUnmount(() => stopRouteGuard?.());

    return {
      getForwardedSlots,
      dialogIsOpen,
      dialogEventListeners,
    };
  },
});

export default ConfirmDialogGuard;
</script>
