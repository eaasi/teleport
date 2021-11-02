'use strict';

const TABLE_NAME = 'eaasi_role';

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

		// existing roles can be referenced from legacy tables as foreign-keys!
		return queryInterface.sequelize.transaction(async (txn) => {
			const options = {
				transaction: txn,
				upsertKeys: [
					'id',
				],
				updateOnDuplicate: [
					'roleName',
					'roleDescription'
				],
			};

			return queryInterface.bulkInsert(TABLE_NAME, roles, options);
		});
	},

	down: (queryInterface) => {
		return queryInterface.sequelize.transaction(async (txn) => {
			const options = {
				transaction: txn
			};

			const sql = 'ALTER SEQUENCE "' + TABLE_NAME + '_id_seq" RESTART WITH 1;';
			await queryInterface.sequelize.query(sql, options);
			return queryInterface.bulkDelete(TABLE_NAME, {}, options);
		});
	}
};
