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
		camelcase: 'off',
		'@typescript-eslint/camelcase': 'off',
		indent: ['error', 'tab'],
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-member-accessibility': 'off',
		'@typescript-eslint/indent': ['error', 'tab'],
		'lines-between-class-members': ['warn', 'always'],
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		quotes: [ 'error', 'single' ],
		semi: [ 'error', 'always' ],
		'@typescript-eslint/array-type': ['error', 'array']
	}
};
