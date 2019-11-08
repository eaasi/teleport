const country = require('../../data/sample_data/country');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('country', country);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('country', {}, {});
	}
};
