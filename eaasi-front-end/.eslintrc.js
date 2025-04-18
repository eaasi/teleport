const INLINE_ELEMENTS = require('./src/utils/inline-non-void-elements.js');

module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true
	},
	extends: ['plugin:vue/strongly-recommended', '@vue/typescript'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly'
	},
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
		parser: '@typescript-eslint/parser'
	},
	plugins: ['@typescript-eslint', 'vue'],
	rules: {
		'lines-between-class-members': ['off', 'never'],
		'vue/component-name-in-template-casing': ['error', 'kebab-case'],
		'vue/order-in-components': [
			'error',
			{
				order: [
					'el',
					'name',
					'extends',
					'functional',
					'mixins',
					'inheritAttrs',
					'model',
					'props',
					['components', 'directives', 'filters'],
					'computed',
					'data',
					'methods',
					'LIFECYCLE_HOOKS',
					'watch'
				]
			}
		],
		'vue/html-indent': [
			'warn',
			'tab',
			{
				attribute: 1,
				baseIndent: 1,
				closeBracket: 0,
				alignAttributesVertically: true,
				ignores: []
			}
		],
		'vue/html-self-closing': [
			'warn',
			{
				html: {
					normal: 'never',
					void: 'always'
				}
			}
		],
		'vue/max-attributes-per-line': [
			'error',
			{
				singleline: 4,
				multiline: {
					max: 1,
					allowFirstLine: false
				}
			}
		],
		'vue/singleline-html-element-content-newline': 'off',
		'vue/require-default-prop': ['off', 'never'],
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'@typescript-eslint/array-type': ['error', { default: 'array' }]
	}
};
