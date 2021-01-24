const preprocessor = require('@cypress/webpack-preprocessor');

/* eslint-disable arrow-body-style */
// https://docs.cypress.io/guides/guides/plugins-guide.html

// if you need a custom webpack configuration you can uncomment the following import
// and then use the `file:preprocessor` event
// as explained in the cypress docs
// https://docs.cypress.io/api/plugins/preprocessors-api.html#Examples

// /* eslint-disable import/no-extraneous-dependencies, global-require */
// const webpack = require('@cypress/webpack-preprocessor')

module.exports = (on, config) => {
  on('file:preprocessor', preprocessor(webpackCypress));

  // This allows us to the test web workers!
  // https://on.cypress.io/browser-launch-api
  on('before:browser:launch', (browser = {}, launchOptions) => {
    if (browser.name === 'electron') {
      launchOptions.args.push('--enable-experimental-web-platform-features');
      return launchOptions;
    }

    return launchOptions;
  });

  return Object.assign({}, config, {
    fixturesFolder: 'tests/e2e/fixtures',
    integrationFolder: 'tests/e2e/specs',
    screenshotsFolder: 'tests/e2e/screenshots',
    videosFolder: 'tests/e2e/videos',
    supportFile: 'tests/e2e/support/index.js',
  });
};
