module.exports = {
	moduleFileExtensions: ['js', 'json', 'ts'],
	transformIgnorePatterns: ['/node_modules/'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	testURL: 'http://localhost/',
	// currently, only tests in test/unit are found by runner
	testMatch: ['**/test/unit/**/*.[jt]s?(x)'],
	collectCoverage: true,
	testResultsProcessor: "jest-sonar-reporter",
};
