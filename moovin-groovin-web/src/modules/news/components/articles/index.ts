import type { Component } from 'vue';
import orderBy from 'lodash/orderBy';

// Import all files in this dir. See https://stackoverflow.com/a/43906442/9788634
const context = require.context('.', true, /.*/);
const keys = orderBy(
  context.keys().filter((key) => key.endsWith('.vue')),
  undefined,
  'desc'
);
const allArticles: Component[] = keys.map((key) => context(key)?.default);

export default allArticles;
