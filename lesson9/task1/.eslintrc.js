module.export = {
    extends: 'eslint-config-airbnb-base',
    rules: {
        'no-console': 2,
    },
    env: {
        browser: true,
    },
    parserOptions: {
        ecmaVersion: 10,
        sourceType: 'module'
    }
}