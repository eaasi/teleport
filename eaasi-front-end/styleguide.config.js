const path = require('path');

module.exports = {
	title: 'EaaSI Vue Components Style Guide',
	components: 'src/components/**/[A-Z]*.vue',
	defaultExample: false,
	copyCodeButton: true,
	pagePerSection: true,
	sections: [
		{
			name: 'Global Components',
			content: 'src/components/docs/sections/Global.md',
			components: 'src/components/global/**/*.vue'
		},

		{
			name: 'Layout Components',
			content: 'src/components/docs/sections/Layout.md',
			components: [
				'src/components/layout/SlideMenu.vue'
			]
		}
	],
	ignore: [
		'**/layout/**',
		'**/sandbox/**',
		'**/global/NumberedSteps/NumberedStep.vue',
		'**/global/SelectableCard/Bookmark.vue',
		'**/global/SelectableCard/SelectableCardContent.vue',
		'**/Home.vue',
	],
	require: [
		path.join(__dirname, 'src/scss/global.scss'),
	],
	template: {
		head: {
			links: [
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css?family=Lato:400,700,900&display=swap',
					crossorigin: 'anonymous'
				},
				{
					rel: 'stylesheet',
					href: 'https://pro.fontawesome.com/releases/v5.8.2/css/all.css',
					crossorigin: 'anonymous'
				},
			],
		}
	},
	editorConfig: {
		theme: 'oceanic-next'
	},
	theme: {
		color: {
			title: '#FFF',
			link: '#8FBADD',
			sidebarBackground: '#EEE',
			linkHover: '#82C5D1',
			codeBase: '#ABB0BF',
			codeBackground: '#202A31',
			codeComment: '#ABB0BF',
			codeString: '#5495BD',
			codeOperator: '#459D8F',
			codeKeyword: '#B28661',
			codeProperty: '#C5CBDB',
			codePunctuation: '#C5CBDB',
			codeFunction: '#C17B8D',
			codeVariable: '#9B85BB',
			sideBarBackground: '#2B373F',
			codeInserted: '#ABB0BF',
		},

		sidebarWidth: 340
	}
};
