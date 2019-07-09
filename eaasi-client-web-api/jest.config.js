module.exports = {
	moduleFileExtensions: ['js', 'json', 'ts'],
	transformIgnorePatterns: ['/node_modules/'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	testURL: 'http://localhost/',
	testMatch: ['**/test/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
};
