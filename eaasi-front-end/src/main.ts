import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './scss/global.scss';
import store from './store';
import eventBus from '@/utils/event-bus';

// Add global SCSS colors
const colorVariables = require('@/scss/_variables.scss');
Vue.prototype.$colors = colorVariables;

// Turn off production tip
Vue.config.productionTip = false;

// Configure a custom error handler
Vue.config.errorHandler = function(err, vm, info) {
	store.set('global/appError', {
		message: err.toString(),
		info: info,
		stack: err.stack
	});
};

/**
 * Listen for ajaxErrors globally
 */
eventBus.$on('ajaxError', err => {
	store.set('global/appError', err);
});

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
