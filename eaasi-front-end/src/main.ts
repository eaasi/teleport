import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './scss/global.scss';
import store from './store';

// Add global SCSS colors
const colorVariables = require('@/scss/_variables.scss');
Vue.prototype.$colors = colorVariables;

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
