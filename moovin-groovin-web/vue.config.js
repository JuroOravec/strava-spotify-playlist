const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  lintOnSave: !isProd,
  runtimeCompiler: true,
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    plugins: [new CleanWebpackPlugin()],
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: `[id].${Date.now()}.bundle.js`,
      chunkFilename: `[id].${Date.now()}.js`,
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/modules/install/styles/main.scss" ',
      },
      scss: {
        prependData: '@import "~@/modules/install/styles/main.scss"; ',
      },
    },
  },
};
