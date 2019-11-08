'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('eaasi_role', [
			{
				createdAt: new Date(),
				updatedAt: new Date(),
				roleName: 'Admin',
				roleDescription: 'Manage Users, Publish Resources, & Config User Permissions'
			},
			{
				createdAt: new Date(),
				updatedAt: new Date(),
				roleName: 'Manager',
				roleDescription: 'Manage Users, Publish Resources, & Config User Permissions'
			},
			{
				createdAt: new Date(),
				updatedAt: new Date(),
				roleName: 'Configuration User',
				roleDescription: 'Configure Resources from Existing Resources, View and Run Emulation'
			},
		]);
	},

	down: (queryInterface, Sequelize) => {
		queryInterface.sequelize.query('ALTER SEQUENCE "eaasi_role_id_seq" RESTART WITH 1;');
		return queryInterface.bulkDelete('eaasi_role', {}, {});
	}
};
