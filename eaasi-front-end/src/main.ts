import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './scss/global.scss';
import store from './store';
import EaasiVueConfig from '@/plugins/EaasiVueConfig';
import GlobalComponents from '@/components/global';
import { appendScript } from '@/utils/functions';
import guacamolejs from '!!raw-loader!../../eaas-client/guacamole/guacamole.js';
import eaasclientjs from '!!raw-loader!../../eaas-client/eaas-client.js';

appendScript(guacamolejs);
appendScript(eaasclientjs);

// TODO: This is to make CI pipelines succeed. Eventually these will become ES6 Modules
// try {
// 	const guacamolejs = require('!!raw-loader!../../eaas-client/guacamole/guacamole.js');
// 	const eaasclientjs = require('!!raw-loader!../../eaas-client/eaas-client.js');
// 	appendScript(guacamolejs);
// 	appendScript(eaasclientjs);
// } catch(e) {
// 	console.warn('Could not import eaas-client and guacamole scripts. Please init eeas-client submodule');
// }

Vue.use(EaasiVueConfig);
Vue.use(GlobalComponents);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');