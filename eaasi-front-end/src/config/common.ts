import { EDITION_TYPES } from '@/utils/constants';

export interface AppConfig {
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

export const APP_CONFIG_DEFAULTS: any = {
	APP_VERSION: '2021.07',
	EDITION_TYPE: EDITION_TYPES.STANDALONE,
	KEYBOARD_SETTINGS_NAME: 'kbLayoutPrefs',
	KEYCLOAK_ON_LOGIN: 'login-required',
	KEYCLOAK_FLOW: 'standard',
	TIME_OUT_DURATION: 60000,
	SAML_ENABLED: false,
};
