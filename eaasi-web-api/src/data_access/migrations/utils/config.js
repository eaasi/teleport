const fs = require('fs/promises');
const path = require('path');

const CONFIG_FILE_NAME = path.resolve(__dirname, '..', '..', 'migrations.json');

export class MigrationConfigManager {
	static async load(migration) {
		const configs = JSON.parse(await fs.readFile(CONFIG_FILE_NAME));
		const config = configs.find(entry => entry.name == migration);
		return Promise.resolve(config);
	}
}
