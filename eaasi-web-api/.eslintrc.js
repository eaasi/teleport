module.exports = {
	root: true,
	env: {
		browser: false,
		es6: true
	},
	extends: [],
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
		indent: ['error', 'tab'],
		'lines-between-class-members': ['warn', 'always'],
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		quotes: [ 'error', 'single' ],
		semi: [ 'error', 'always' ],
		'@typescript-eslint/array-type': ['error', 'array']
	}
};
