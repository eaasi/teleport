'use strict';

const TABLE_NAME = 'eaasi_role';

async function reset(table, queryInterface, options) {
	const sql = 'ALTER SEQUENCE "' + table + '_id_seq" RESTART WITH 1;';
	await queryInterface.sequelize.query(sql, options);
	return queryInterface.bulkDelete(table, {}, options);
}

module.exports = {
	up: async (queryInterface) => {
		const timestamp = new Date();
		const roles = [
			{
				id: 1,
				createdAt: timestamp,
				updatedAt: timestamp,
				roleName: 'Admin',
				roleDescription: 'Power user with all permissions to manage a node, its users, and resources'
			},
			{
				id: 2,
				createdAt: timestamp,
				updatedAt: timestamp,
				roleName: 'Manager',
				roleDescription: 'Second tier user with permission to manage contributions to node and Network'
			},
			{
				id: 3,
				createdAt: timestamp,
				updatedAt: timestamp,
				roleName: 'Configuration User',
				roleDescription: 'User responsible for import of certain resources (software / content) combination of resources intro new projects, and documentation of resources worked with'
			},
		];

		return queryInterface.sequelize.transaction(async (txn) => {
			const options = {
				transaction: txn
			};

			console.info('Deleting existing roles...');
			await reset(TABLE_NAME, queryInterface, options);

			console.info('Inserting default roles...');
			return queryInterface.bulkInsert(TABLE_NAME, roles, options);
		});
	},

	down: (queryInterface) => {
		return queryInterface.sequelize.transaction((txn) => {
			const options = {
				transaction: txn
			};

			return reset(TABLE_NAME, queryInterface, options);
		});
	}
};
