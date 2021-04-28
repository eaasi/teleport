const CopyPlugin = require('copy-webpack-plugin');
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
				data: `
					@import "@/scss/_variables.scss";
					@import "@/scss/_mixins.scss";
				`
			}
	  	}
	},
	configureWebpack: (config) => ({
		plugins: [
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
				EaasClient: path.resolve(__dirname, '../eaas-client/')
			}
		}
	})
};