'use strict';

const { getColumnNames } = require('./utils/postgresql');

const TABLE_NAME = 'bookmark';

const COLUMNS = [
	{
		oldname: 'userID',
		newname: 'userId',
	},
	{
		oldname: 'resourceID',
		newname: 'resourceId',
	},
];

const CONSTRAINTS_TO_REMOVE = [
	'bookmark_userID_fkey',
];


module.exports = {
	up: async (queryInterface) => {
		const names = await getColumnNames(TABLE_NAME, queryInterface);
		return queryInterface.sequelize.transaction(async (txn) => {
			const options = {
				transaction: txn
			};

			for (const { oldname, newname } of COLUMNS) {
				if (!names.has(oldname))
					continue;

				console.info('Renaming legacy column: "' + oldname + '" -> "' + newname + '"');
				await queryInterface.renameColumn(TABLE_NAME, oldname, newname, options);
			}

			for (const constraint of CONSTRAINTS_TO_REMOVE) {
				try {
					console.info('Removing legacy constraint: "' + constraint + '"');
					await queryInterface.removeConstraint(TABLE_NAME, constraint, options);
				}
				catch (error) {
					const details = error.name + ': ' + error.message;
					console.warn('Removing constraint "' + constraint + '" failed! ' + details);
				}
			}
		});
	},
	down: async (queryInterface) => {
		return queryInterface.sequelize.transaction(async (txn) => {
			const options = {
				transaction: txn
			};

			for (const { oldname, newname } of COLUMNS) {
				console.info('Renaming column: "' + newname + '" -> "' + oldname + '"');
				await queryInterface.renameColumn(TABLE_NAME, newname, oldname, options);
			}
		});
	}
};
