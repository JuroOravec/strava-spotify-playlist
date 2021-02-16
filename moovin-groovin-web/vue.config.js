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
  chainWebpack: (config) => {
    config.plugin('fork-ts-checker').tap((args) => {
      args[0].tsconfig = './tsconfig.build.json';
      return args;
    });
    config.plugin('html').tap((args) => {
      args[0].title = 'MoovinGroovin - Save the songs that keep you moving';
      return args;
    });
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '',
      },
      scss: {
        prependData: '',
      },
    },
  },
};
