import GlobalComponents from '@/components/global';
import EaasiVueConfig from '@/plugins/EaasiVueConfig';
import StringCleaner from '@/utils/string-cleaner';
import Vue from 'vue';
import App from './App.vue';
import clickOutside from './directives/click-outside';
import router from './router';
import './scss/global.scss';
import store from './store';

Vue.use(EaasiVueConfig);
Vue.use(GlobalComponents);

/*============================================================
 == Filters
/============================================================*/

/**
 * Strips HTML tags from provided string
 */
Vue.filter('stripHtml', value => {
	if (!value) return '';
	value = value.toString();
	return StringCleaner.stripHTML(value);
});

Vue.filter('js-date-pretty-format', value => {
	if (!value) return '';
	let dt = new Date(value);
	return `${
		(dt.getMonth()+1).toString().padStart(2, '0')}/${
		dt.getDate().toString().padStart(2, '0')}/${
		dt.getFullYear().toString().padStart(4, '0')} ${
		dt.getHours().toString().padStart(2, '0')}:${
		dt.getMinutes().toString().padStart(2, '0')}:${
		dt.getSeconds().toString().padStart(2, '0')}`;
});

Vue.directive('click-outside', clickOutside);

/*============================================================
 == Global Vue Instance
/============================================================*/

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');