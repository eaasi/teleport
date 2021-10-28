/*============================================================
 == Constants
/============================================================*/

import { EDITION_TYPES } from '@/utils/constants';

interface AppConfig {
	APP_VERSION: string;
	EDITION_TYPE: string;
	BASE_URL: string;
	SERVICE_URL: string;
	REST_API_URL: string;
	EMIL_SERVICE_ENDPOINT: string;
	JWT_NAME: string;
	ENV: string;
	NODE_NAME: string;
	SAML_ENABLED: boolean;
	KEYBOARD_SETTINGS_NAME: string;
	KEYCLOAK_URL: string;
	KEYCLOAK_REALM: string;
	KEYCLOAK_CLIENT_ID: string;
	KEYCLOAK_CLIENT_SCOPE: string;
	KEYCLOAK_ON_LOGIN: string;
	KEYCLOAK_FLOW: string;
	TIME_OUT_DURATION: number;
	SHOW_DEBUG_ERRORS: string;
}

const APP_CONFIG_DEFAULTS: any = {
	APP_VERSION: '2021.07',
	EDITION_TYPE: EDITION_TYPES.STANDALONE,
	KEYBOARD_SETTINGS_NAME: 'kbLayoutPrefs',
	KEYCLOAK_ON_LOGIN: 'login-required',
	KEYCLOAK_FLOW: 'standard',
	TIME_OUT_DURATION: 60000,
	SAML_ENABLED: false,
};

function getLocalConfig(): AppConfig {
	const config: AppConfig = {
		...APP_CONFIG_DEFAULTS,
		BASE_URL: process.env.VUE_APP_BASE_URL,
		SERVICE_URL: process.env.VUE_APP_SERVICE_URL,
		REST_API_URL: process.env.VUE_APP_API_BASE_URL,
		EMIL_SERVICE_ENDPOINT: process.env.VUE_APP_EMIL_SERVICE_ENDPOINT,
		JWT_NAME: process.env.VUE_APP_JWT_NAME,
		SHOW_DEBUG_ERRORS: process.env.VUE_APP_SHOW_DEBUG_ERRORS,
		ENV: process.env.VUE_APP_ENV,
		NODE_NAME: process.env.VUE_APP_NODE_NAME,
		SAML_ENABLED: process.env.VUE_APP_SAML_ENABLED == 'true' || process.env.VUE_APP_SAML_ENABLED == 'True',
		KEYCLOAK_URL: process.env.VUE_APP_KEYCLOAK_URL,
		KEYCLOAK_REALM: process.env.VUE_APP_KEYCLOAK_REALM,
		KEYCLOAK_CLIENT_ID: process.env.VUE_APP_KEYCLOAK_CLIENT_ID,
		KEYCLOAK_CLIENT_SCOPE: process.env.VUE_APP_KEYCLOAK_CLIENT_SCOPE,
	};

	if (process.env.VUE_APP_EDITION_TYPE != null)
		config.EDITION_TYPE = process.env.VUE_APP_EDITION_TYPE;

	if (process.env.VUE_APP_TIME_OUT_DURATION != null)
		config.TIME_OUT_DURATION = Number(process.env.VUE_APP_TIME_OUT_DURATION);

	return config;
}

async function getRemoteConfig(): Promise<AppConfig> {
	const response = await fetch('/config.json');
	const config = await response.json();
	return Promise.resolve({
		...APP_CONFIG_DEFAULTS,
		...config,
	});
}

const APP_CONFIG: AppConfig = (process.env.VUE_APP_BASE_URL != null) ?
		getLocalConfig() : await getRemoteConfig();

export default APP_CONFIG;
