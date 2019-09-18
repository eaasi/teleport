import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './scss/global.scss';
import store from './store';
import EaasiVueConfig from '@/plugins/EaasiVueConfig';
import GlobalComponents from '@/components/global';
// import 'flexboxgrid';

Vue.use(EaasiVueConfig);
Vue.use(GlobalComponents);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
