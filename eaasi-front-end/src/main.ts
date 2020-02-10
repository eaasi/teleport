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

Vue.directive('click-outside', clickOutside);

/*============================================================
 == Global Vue Instance
/============================================================*/

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');