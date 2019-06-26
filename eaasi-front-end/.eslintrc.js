
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
		parser: '@typescript-eslint/parser',
	},
	plugins: [
		'@typescript-eslint',
		'vue'
	],
	rules: {
		indent: ['error', 'tab'],
		'lines-between-class-members': ['warn', 'always'],
		'vue/component-name-in-template-casing': ['error', 'kebab-case'],
		'vue/order-in-components': [
			'error', {
				'order': [
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
		'vue/html-indent': ['warn', 'tab', {
			'attribute': 1,
			'baseIndent': 1,
			'closeBracket': 0,
			'alignAttributesVertically': true,
			'ignores': []
		}],
		'vue/max-attributes-per-line': ['error', {
			'singleline': 4,
			'multiline': {
			  'max': 1,
			  'allowFirstLine': false
			}
		}],
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		quotes: [ 'error', 'single' ],
		semi: [ 'error', 'always' ]
	}
};