import html from 'eslint-plugin-html';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';

// Enforces the code style rules listed in AGENTS.md.
export default [
    {
        ignores: ['node_modules/', 'logs/'],
    },
    {
        files: ['**/*.html', '**/*.js'],
        plugins: { html, unicorn },
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'script',
            globals: globals.browser,
        },
        rules: {
            'unicorn/prefer-global-this': 'error',
            'unicorn/no-for-each': 'error',
            'unicorn/prefer-number-properties': 'error',
            'unicorn/prefer-modern-math-apis': 'error',
            'no-unused-vars': 'error',
        },
    },
    {
        files: ['eslint.config.js'],
        languageOptions: { sourceType: 'module', globals: globals.node },
    },
];
