import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './scss/global.scss';
import store from './store';

// Add global SCSS colors
const colorVariables = require('@/scss/_variables.scss');
Vue.prototype.$colors = colorVariables;

// Turn off production tip
Vue.config.productionTip = false;

// Configure a custom error handler
Vue.config.errorHandler = function(err, vm, info) {
	console.log(`Howdy: ${err.toString()}\nInfo: ${info}`);
};

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
