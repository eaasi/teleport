const testUsers = require('../../../test/data/faker-users');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('eaasi_user', testUsers);
	},

	down: (queryInterface) => {
		queryInterface.sequelize.query('ALTER SEQUENCE "eaasi_user_id_seq" RESTART WITH 1;');
		return queryInterface.bulkDelete('eaasi_user', {}, {});
	}
};