/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  ignorePatterns: ["!**/.server", "!**/.client"],

  // Base ESLint config
  extends: ["eslint:recommended"],

  overrides: [
    // React settings
    {
      files: ["**/*.{js,jsx,ts,tsx}"],
      plugins: ["react", "jsx-a11y", "import"],
      extends: [
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
      ],
      settings: {
        react: {
          version: "detect",
        },
        formComponents: ["Form"],
        linkComponents: [
          { name: "Link", linkAttribute: "to" },
          { name: "NavLink", linkAttribute: "to" },
        ],
        "import/resolver": {
          node: {
            paths: ["app"],
            extensions: [".js", ".jsx", ".ts", ".tsx"],
          },
          typescript: {
            alwaysTryTypes: true,
            project: "./tsconfig.json",
          },
        },
      },
    },

    // TypeScript settings
    {
      files: ["**/*.{ts,tsx}"],
      plugins: ["@typescript-eslint", "import"],
      parser: "@typescript-eslint/parser",
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
      ],
      rules: {
        "@typescript-eslint/no-unused-vars": [
          "warn",
          { argsIgnorePattern: "^_" },
        ],
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "import/no-unresolved": "error", // Ensure import paths are valid
      },
    },

    // Node settings
    {
      files: [".eslintrc.cjs"],
      env: {
        node: true,
      },
    },
  ],
};
