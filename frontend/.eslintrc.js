module.exports = {
  root: true,
  overrides: [
    {
      files: ["*.ts"],
      parserOptions: {
        project: [
          "**/tsconfig.*?.json",
          "**/e2e/tsconfig.json"
        ],
        createDefaultProgram: true
      },
      extends: [
        "plugin:@angular-eslint/recommended",
        'airbnb-typescript/base',
        'plugin:prettier/recommended'
      ],
      rules: {
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'class-methods-use-this': 'off',
        'lines-between-class-members': ['error', 'always', { 'exceptAfterSingleLine': true }],
        'no-return-assign': 'off',
        'prefer-destructuring': 'off',
        'no-param-reassign': 'off',
        'no-plusplus': 'off',
        'no-underscore-dangle': 'off',
        '@typescript-eslint/no-shadow': 'off',
        'max-len': [
          'error',
          {
            'code': 140,
            'ignoreUrls': true,
            'ignoreRegExpLiterals': true,
            'ignoreStrings': true
          }
        ],
      }
    },
    {
      files: ["*.component.html"],
      extends: ["plugin:@angular-eslint/template/recommended"],
      rules: {
        "max-len": ["error", { "code": 140, 'ignoreUrls': true, }]
      }
    },
    {
      files: ["*.component.ts"],
      extends: ["plugin:@angular-eslint/template/process-inline-templates"]
    }
  ]
}
