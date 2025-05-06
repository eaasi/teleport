module.exports = {
	preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
	cacheDirectory: '../.jest',
	transformIgnorePatterns: [
		'/node_modules/(?!openapi-fetch)',
	],
	moduleDirectories: ['node_modules', '<rootDir>'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1'
	}
};