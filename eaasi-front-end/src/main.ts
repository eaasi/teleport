import GlobalComponents from '@/components/global';
import EaasiVueConfig from '@/plugins/EaasiVueConfig';
import StringCleaner from '@/utils/string-cleaner';
import Vue from 'vue';
import App from './App.vue';
import clickOutside from './directives/click-outside';
import router from './router';
import './scss/global.scss';
import store from './store';
import Keycloak from 'keycloak-js';
import config from '@/config';
import * as EaasClient from 'EaasClient/eaas-client.js';
import { setUserToken } from '@/utils/auth';

(window as any).EaasClient = EaasClient;

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
	const dt = new Date(value);
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

const initOptions = {
	url: config.KEYCLOAK_URL,
	realm: config.KEYCLOAK_REALM,
	scope: config.KEYCLOAK_CLIENT_SCOPE,
	clientId: config.KEYCLOAK_CLIENT_ID,
	onLoad: config.KEYCLOAK_ON_LOGIN as Keycloak.KeycloakOnLoad,
	flow: config.KEYCLOAK_FLOW as Keycloak.KeycloakFlow
};

(window as any).keycloak = Keycloak(initOptions);
(window as any).keycloak.init(initOptions).then(async (auth) => {
	if (!auth) {
		window.location.reload();
	} else {
		store.dispatch('login', (window as any).keycloak.token);

		new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount('#app');
	}

	// Refreshes access-token if it expires in lifespan/2
	setInterval(() => {
		(window as any).keycloak.updateToken(((window as any).keycloak.tokenParsed.exp - (window as any).keycloak.tokenParsed.iat) / 2)
			.then((refreshed) => {
				if (refreshed) {
					setUserToken((window as any).keycloak.token);
				}
			})
			.catch(() => {
				console.error('Failed to refresh token');
			});
	}, 60 * 1000);
}).catch((e) => {
	console.error('Keycloak init error: ', e);
});