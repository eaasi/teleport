'use strict';

const TABLE_NAMES = [
	'imported_content',
	'imported_software',
	'imported_image',
];

module.exports = {
	up: async (queryInterface) => {
		const names = await queryInterface.showAllTables();
		return queryInterface.sequelize.transaction(async (txn) => {
			const options = {
				transaction: txn
			};

			for (const oldname of TABLE_NAMES) {
				if (!names.includes(oldname))
					continue;

				const newname = 'user_' + oldname;
				console.info('Renaming legacy table: "' + oldname + '" -> "' + newname + '"');
				await queryInterface.renameTable(oldname, newname, options);
			}
		});
	},
	down: async (queryInterface) => {
		const names = await queryInterface.showAllTables();
		return queryInterface.sequelize.transaction(async (txn) => {
			const options = {
				transaction: txn
			};

			for (const oldname of TABLE_NAMES) {
				const newname = 'user_' + oldname;
				if (!names.includes(newname))
					continue;

				console.info('Renaming table: "' + newname + '" -> "' + oldname + '"');
				await queryInterface.renameTable(newname, oldname, options);
			}
		});
	}
};
