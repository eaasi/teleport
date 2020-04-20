module.exports = {
	root: true,
	env: {
		browser: false,
		es6: true
	},
	extends: ['plugin:@typescript-eslint/recommended'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly'
	},
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
		parser: '@typescript-eslint/parser',
	},
	plugins: [
		'@typescript-eslint',
	],
	rules: {
		'camelcase': 'off',
		'indent': ['error', 'tab', { 'SwitchCase': 1 }],
		'lines-between-class-members': ['warn', 'always'],
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'quotes': [ 'error', 'single' ],
		'semi': 'off',
		'lines-between-class-members': ['error', 'always', {
			'exceptAfterSingleLine': true
		}],
		'@typescript-eslint/array-type': ['error', 'array'],
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-member-accessibility': 'off',
		'@typescript-eslint/indent': ['error', 'tab'],
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/camelcase': 'off',
		'@typescript-eslint/interface-name-prefix': 'off'
	}
};
