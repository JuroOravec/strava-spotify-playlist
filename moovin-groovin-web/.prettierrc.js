/**---------------------------------------------------
 * Client Prettier Configuration File
 * ---------------------------------------------------
 * We are using ESLint in conjunction with Prettier.
 * - Prettier is used for opinionated autoformatting on save (e.g. adding spaces, wrapping lines)
 * - ESLint is used as a mechanism for raising syntax or other 'Problems' to be fixed
 * 
 * You should configure your IDE to Format on Save using an extension such as:
 * https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
 * 
 * For Prettier configuration options see:
 * https://prettier.io/docs/en/options.html
 ---------------------------------------------------*/
module.exports = {
  printWidth: 100,
  trailingComma: 'es5',
  arrowParens: 'always',
  tabWidth: 2,
  singleQuote: true,
};
