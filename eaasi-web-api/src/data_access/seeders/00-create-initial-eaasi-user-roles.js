module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('eaasi_role', [
			{
				id: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
				roleName: 'Admin',
				roleDescription: 'Power user with all permissions to manage a node, its users, and resources'
			},
			{
				id: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
				roleName: 'Manager',
				roleDescription: 'Second tier user with permission to manage contributions to node and Network'
			},
			{
				id: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
				roleName: 'Configuration User',
				roleDescription: 'User responsible for import of certain resources (software / content) combination of resources intro new projects, and documentation of resources worked with'
			},
		]);
	},

	down: (queryInterface, Sequelize) => {
		queryInterface.sequelize.query('ALTER SEQUENCE "eaasi_role_id_seq" RESTART WITH 1;');
		return queryInterface.bulkDelete('eaasi_role', {}, {});
	}
};
