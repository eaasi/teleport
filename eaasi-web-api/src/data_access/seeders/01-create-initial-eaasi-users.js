module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('eaasi_user', [
			{
				createdAt: new Date(),
				updatedAt: new Date(),
				username: 'andrii',
				firstName: 'Andrii',
				lastName: 'Kost',
				email: 'andrii@portalmedia.com',
				roleId: 1
			},
			{
				createdAt: new Date(),
				updatedAt: new Date(),
				username: 'brandon',
				firstName: 'Brandon',
				lastName: 'Wiemann',
				email: 'brandon@portalmedia.com',
				roleId: 1
			},
			{
				createdAt: new Date(),
				updatedAt: new Date(),
				username: 'wes',
				firstName: 'Wes',
				lastName: 'Doyle',
				email: 'wes@portalmedia.com',
				roleId: 1
			}
		])
	},

	down: (queryInterface) => {
		queryInterface.sequelize.query('ALTER SEQUENCE "eaasi_user_id_seq" RESTART WITH 1;');
		return queryInterface.bulkDelete('eaasi_user', {}, {});
	}
};

