module.exports = {
    root: true,
    env: {browser: true, es2020: true},
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', 'simple-import-sort'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            {allowConstantExport: true},
        ],
        "no-console": "error",
        "quotes": ["warn", "single"],
        "indent": "off",
        "jsx-quotes": ["warn", "prefer-single"],
        "simple-import-sort/imports": ["error", {
            "groups": [
                ["^react", "^@?\\w"],
                ["^(@|components)(/.*|$)"],
                ["^\\u0000"],
                ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
                ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
                ["^.+\\.?(css)$"]
            ]
        }],
        "simple-import-sort/exports": "error"

    },
}
