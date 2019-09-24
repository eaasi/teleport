const data = require('../data/systemRequirements');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('systemRequirements', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('systemRequirements', {}, {});
	}
};
