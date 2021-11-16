'use strict';

const path = require('path');
const dirname = path.resolve(__dirname, '..', 'migrations.legacy');

async function listLegacyMigrations() {
	const fs = require('fs/promises');
	const files = (await fs.readdir(dirname))
		.filter(file => file.endsWith('.js'));

	return Promise.resolve(files);
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		// revert migrations in reverse order!
		const files = await listLegacyMigrations();
		files.reverse();

		for (const file of files) {
			console.info('Reverting legacy migration ' + file);
			const migration = require(path.resolve(dirname, file));
			await migration.down(queryInterface, Sequelize);
		}

		// tables without a migration file
		const tables = [
			'network_environment',
			'system_requirements_requires_os_version',
		];

		for (const table of tables) {
			console.info('Deleting table ' + table);
			await queryInterface.dropTable(table);
		}

		return Promise.resolve(true);
	},

	down: async (queryInterface, Sequelize) => {
		for (const file of await listLegacyMigrations()) {
			console.info('Applying legacy migration ' + file);
			const migration = require(path.resolve(dirname, file));
			await migration.up(queryInterface, Sequelize);
		}

		return Promise.resolve(true);
	}
};
