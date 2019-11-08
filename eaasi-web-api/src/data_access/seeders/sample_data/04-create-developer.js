const developer = require('../../data/sample_data/developer');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('developer', developer);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('developer', {}, {});
	}
};
