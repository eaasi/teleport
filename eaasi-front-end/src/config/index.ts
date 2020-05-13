/*============================================================
 == Constants
/============================================================*/

export default {
	BASE_URL: process.env.VUE_APP_BASE_URL,
	SERVICE_URL: process.env.VUE_APP_SERVICE_URL,
	REST_API_URL: process.env.VUE_APP_API_BASE_URL,
	EMIL_SERVICE_ENDPOINT: process.env.VUE_APP_EMIL_SERVICE_ENDPOINT,
	JWT_NAME: process.env.VUE_APP_JWT_NAME,
	SHOW_DEBUG_ERRORS: process.env.VUE_APP_SHOW_DEBUG_ERRORS,
	ENV: process.env.VUE_APP_ENV,
	NODE_NAME: process.env.VUE_APP_NODE_NAME,
	TIME_OUT_DURATION: Number(process.env.VUE_APP_TIME_OUT_DURATION) || 60000,
	SAML_ENABLED: process.env.VUE_APP_SAML_ENABLED == 'true' || process.env.VUE_APP_SAML_ENABLED == 'True',
	APP_VERSION: '1.8.13',
};
