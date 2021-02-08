const commonRestrictedSyntax = [
  {
    // Raise when calling watch() inside a watch() callback
    selector: 'CallExpression[callee.name="watch"] CallExpression[callee.name="watch"]',
    message: 'Do not use nested watchers.',
  },
  {
    // Raise on `export { xyz as default }`
    selector: 'ExportNamedDeclaration > ExportSpecifier[exported.name="default"]',
    message:
      'TypeScript auto-completion is not available for `export { abc as default }` syntax. Use `export default abc` instead.',
  },
];

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'prettier',
    'prettier/@typescript-eslint',
    'eslint:recommended',
    'plugin:prettier/recommended', // any change which is enforced by Prettier, will be raised as a lint error
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    // //////////////////////////////
    // GENERAL
    // //////////////////////////////
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    // Avoid issues of importing packages not in the local dependency list,
    'import/no-extraneous-dependencies': ['error'],
    'import/no-unresolved': 'off',
    'no-duplicate-imports': 'error',
    // Being conscious about the bundle size, restrict top level imports that bloat the bundle.
    'no-restricted-imports': [
      'error',
      {
        paths: [
          // Lodash functions should be imported one-by-one,
          // such as import orderBy from 'lodash/orderBy';
          'lodash',
        ],
      },
    ],
    // Define forbidden syntax by AST selector
    'no-restricted-syntax': ['error', ...commonRestrictedSyntax],

    // //////////////////////////////
    // TYPESCRIPT
    // //////////////////////////////

    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_(1|2|3|4)?$',
        argsIgnorePattern: '^_(1|2|3|4)?$',
        // varsIgnorePattern and argsIgnorePAttern makes ESLint ignore _, _1, _2,... variables, useful when dealing with a lot of positional arguments.
        ignoreRestSiblings: true,
        // ignoreRestSiblings is useful when destructuring with rest is used. E.g. I want a copy of the object without the name property:
        // const {name, ...restWithoutName} = myObj;
        // if name is not used but restWithoutName is used, this won't be an error.
      },
    ],
    '@typescript-eslint/ban-ts-comment': ['warn'],
    // Enforce all names to be either camelCase, PascalCase or UPPER_CASE
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'default', // Match everything
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        // Ignore Apollo's typename props
        filter: {
          regex: '_(_typename)?',
          match: false,
        },
      },
    ],
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
