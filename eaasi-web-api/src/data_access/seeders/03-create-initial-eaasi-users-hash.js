const data = require('../data/eaasiUserHash');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('eaasi_user_hash', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('eaasi_user_hash', {}, {});
	}
};

