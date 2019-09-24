const data = require('../data/recommendationlevel');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('recommendationLevel', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('recommendationLevel', {}, {});
	}
};
