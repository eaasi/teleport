import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './scss/global.scss';
import store from './store';
import EaasiVueConfig from '@/plugins/EaasiVueConfig';
import GlobalComponents from '@/components/global';
import StringCleaner from '@/utils/string-cleaner';

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

/*============================================================
 == Global Vue Instance
/============================================================*/

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');