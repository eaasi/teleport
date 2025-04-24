import config from '@/config';
import store from '@/store';
//const colorVariables = require('@/scss/_variables.scss');

export default {
	install: function(Vue: Vue.VueConstructor, options: any) {

		// Add global SCSS colors
		//Vue.prototype.$colors = colorVariables;

		// Add global constants
		Vue.prototype.$constants = config;

		// Turn off production tip
		Vue.config.productionTip = false;

		// Configure a custom error handler
		Vue.config.errorHandler = (err, _vm, info) => {
			// @ts-ignore
			store.set('appError', {
				message: err.toString(),
				info: info,
				stack: err.stack
			});
		};
	}

};