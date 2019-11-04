const country = require('../data/country');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('Country.ts', country);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('Country.ts', {}, {});
	}
};
