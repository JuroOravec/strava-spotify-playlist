module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  clearMocks: true,
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
};
