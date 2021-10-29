const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const EaasClientCopyPattern = (config, subpath) => {
	const outdir = path.dirname(config.output.filename);
	return {
		from: path.join('../eaas-client', subpath),
		to: path.join(outdir, subpath)
	};
};

module.exports = {
	css: {
	  	loaderOptions: {
			sass: {
				additionalData: (source, context) => {
					if (context.resourcePath.endsWith('scss/_variables.scss'))
						return source;

					return `
						@import "@/scss/_variables.scss";
						@import "@/scss/_mixins.scss";
						${source}
					`;
				},
			}
	  	}
	},
	configureWebpack: (config) => {
		const experiments = {
			// Enable support for top-level-await
			topLevelAwait: true,
		};

		if (config.experiments == null)
			config.experiments = {};

		Object.assign(config.experiments, experiments);
		return {
			plugins: [
				new webpack.ProvidePlugin({
					Buffer: [require.resolve('buffer/'), 'Buffer'],
					console: require.resolve('console-browserify'),
					process: require.resolve('process/browser'),
				}),
				new CopyPlugin(
					{
						patterns: [
							EaasClientCopyPattern(config, 'xpra/xpra-html5/html5'),
							EaasClientCopyPattern(config, 'xpra/eaas-xpra-worker.js'),
							EaasClientCopyPattern(config, 'xpra/xpraWrapper.js'),
							EaasClientCopyPattern(config, 'xpra/eaas-xpra.js'),
							EaasClientCopyPattern(config, 'guacamole/guacamole-client-eaas/guacamole-common-js/src/main/webapp/modules'),
							EaasClientCopyPattern(config, 'guacamole/guacamole-client-eaas/guacamole/src/main/webapp/app/client/styles/keyboard.css'),
							EaasClientCopyPattern(config, 'guacamole/guacamole-client-eaas/guacamole/src/main/webapp/app/osk/styles/osk.css'),
						]
					},
					{
						copyUnmodified: true
					}
				)
			],
			resolve: {
				alias: {
					EaasClient: path.resolve(__dirname, '../eaas-client/'),
					zlib: require.resolve('browserify-zlib'),
				},
				// define polyfills for node's modules (missing in webpack 5+)
				fallback: {
					buffer: require.resolve('buffer/'),
					console: require.resolve('console-browserify'),
					crypto: require.resolve('crypto-browserify'),
					stream: require.resolve('stream-browserify'),
					process: require.resolve('process/browser'),
					vm: require.resolve('vm-browserify'),
					util: require.resolve('util/'),
				},
			}
		};
	}
};