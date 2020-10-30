module.exports = {
	moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'ts', 'tsx', 'd.ts'],
	transform: {
		'^.+\\.vue$': 'vue-jest',
		'.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
		'^.+\\.tsx?$': 'ts-jest',
	},
	transformIgnorePatterns: ['/node_modules/'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	snapshotSerializers: ['jest-serializer-vue'],
	testMatch: ['**/tests/unit/**/*.spec.(js|ts)'],
	testURL: 'http://localhost/',
	watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
	globals: {
		'ts-jest': {
			babelConfig: true,
		},
	},
	collectCoverage: true,
	coverageReporters: ['lcov'],
};
