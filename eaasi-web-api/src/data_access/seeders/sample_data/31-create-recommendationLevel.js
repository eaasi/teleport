const data = require('../../data/recommendationlevel');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('recommendation_level', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('recommendation_level', {}, {});
	}
};
