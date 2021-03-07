<template>
  <Page>
    <template slot="menu-left">
      <DashboardMenu />
    </template>
  </Page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import Page from '@/modules/base/components/Page.vue';
import DashboardMenu from './DashboardMenu.vue';

const DashboardPage = defineComponent({
  name: 'DashboardPage',
  components: {
    Page,
    DashboardMenu,
  },
});

export default DashboardPage;
</script>
