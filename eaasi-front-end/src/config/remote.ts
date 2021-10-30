import { AppConfig, APP_CONFIG_DEFAULTS } from './common';

async function getRemoteConfig(): Promise<AppConfig> {
	const response = await fetch('/config.json');
	return response.json() as Promise<AppConfig>;
}

const APP_CONFIG: AppConfig = {
	...APP_CONFIG_DEFAULTS,
	...await getRemoteConfig(),
};

export default APP_CONFIG;
