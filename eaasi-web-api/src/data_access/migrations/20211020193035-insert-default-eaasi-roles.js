'use strict';

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

		for (const role of roles) {
			try {
				await queryInterface.upsert('eaasi_role', role);
			}
			catch (error) {
				// Ignore it!
			}
		}

		return Promise.resolve(true);
	},

	down: (queryInterface) => {
		queryInterface.sequelize.query('ALTER SEQUENCE "eaasi_role_id_seq" RESTART WITH 1;');
		return queryInterface.bulkDelete('eaasi_role', {}, {});
	}
};
