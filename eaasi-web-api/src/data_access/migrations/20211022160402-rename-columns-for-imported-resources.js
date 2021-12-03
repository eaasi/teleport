'use strict';

const { getColumnNames } = require('./utils/postgresql');

const TABLES = [
	'user_imported_content',
	'user_imported_software',
	'user_imported_environment',
	'user_imported_image',
];

const COLUMNS = [
	{
		oldname: 'userID',
		newname: 'userId',
	},
	{
		oldname: 'eaasiID',
		newname: 'eaasiId',
	},
];

module.exports = {
	up: async (queryInterface) => {
		const tables = await queryInterface.showAllTables();
		return queryInterface.sequelize.transaction(async (txn) => {
			const options = {
				transaction: txn
			};

			for (const table of TABLES) {
				if (!tables.includes(table))
					continue;

				console.info('Renaming legacy columns for table "' + table + '"...');
				const columns = await getColumnNames(table, queryInterface);
				for (const { oldname, newname } of COLUMNS) {
					if (!columns.has(oldname))
						continue;

					await queryInterface.renameColumn(table, oldname, newname, options);
				}
			}
		});
	},
	down: async (queryInterface) => {
		const tables = await queryInterface.showAllTables();
		return queryInterface.sequelize.transaction(async (txn) => {
			const options = {
				transaction: txn
			};

			for (const table of TABLES) {
				if (!tables.includes(table))
					continue;

				console.info('Renaming columns for table: "' + table + '"...');
				for (const { oldname, newname } of COLUMNS)
					await queryInterface.renameColumn(table, newname, oldname, options);
			}
		});
	}
};
