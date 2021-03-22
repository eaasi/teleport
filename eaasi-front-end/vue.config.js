const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	css: {
	  	loaderOptions: {
			sass: {
				data: `
					@import "@/scss/_variables.scss";
					@import "@/scss/_mixins.scss";
				`
			}
	  	}
	},
	configureWebpack: {
		plugins: [
			new CopyPlugin(
				{
					patterns: [
						{
							from: '../eaas-client',
							to: './eaas-client',
							force: true
						}
					]
				},
				{
					copyUnmodified: true
				}
			)
		]
	}
};