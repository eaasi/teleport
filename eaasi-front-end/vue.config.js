const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

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
						{from: '../eaas-client/xpra/xpra-html5/html5', to: 'xpra/xpra-html5/html5/' },
						{from: '../eaas-client/xpra/eaas-xpra-worker.js', to: 'xpra' },
						{from: '../eaas-client/xpra/xpraWrapper.js', to: 'xpra' },
						{from: '../eaas-client/xpra/eaas-xpra.js', to: 'xpra' },
						{from: '../eaas-client/lib', to: 'lib' },
						{from: '../eaas-client/guacamole/guacamole-client-eaas/guacamole-common-js/src/main/webapp/modules/', to: 'guacamole/guacamole-client-eaas/guacamole-common-js/src/main/webapp/modules/' },
						{from: '../eaas-client/guacamole/guacamole-client-eaas/guacamole/src/main/webapp/app/client/styles/keyboard.css', to: 'guacamole/guacamole-client-eaas/guacamole/src/main/webapp/app/client/styles/keyboard.css' },
						{from: '../eaas-client/guacamole/guacamole-client-eaas/guacamole/src/main/webapp/app/osk/styles/osk.css', to: 'guacamole/guacamole-client-eaas/guacamole/src/main/webapp/app/osk/styles/osk.css' },
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
	}
};