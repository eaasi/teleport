module.exports = {
	preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
	cacheDirectory: '../.jest',
	transformIgnorePatterns: [
		'/node_modules/(?!openapi-fetch)',
	],
};
