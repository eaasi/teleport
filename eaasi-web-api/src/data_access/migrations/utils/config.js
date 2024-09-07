const fs = require('fs').promises;
const path = require('path');

const BASE_DIRECTORY_NAME = path.resolve(__dirname, '..', '..');
const EXPORT_DIRECTORY_NAME = path.resolve(BASE_DIRECTORY_NAME, 'exports');
const CONFIG_FILE_NAME = path.resolve(BASE_DIRECTORY_NAME, 'migrations.json');

export class MigrationConfigManager {
	static async load(migration) {
		const configs = JSON.parse(await fs.readFile(CONFIG_FILE_NAME));
		const config = configs.find(entry => entry.name == migration);
		return Promise.resolve(config);
	}

	static getExportDirectory() {
		return EXPORT_DIRECTORY_NAME;
	}
}