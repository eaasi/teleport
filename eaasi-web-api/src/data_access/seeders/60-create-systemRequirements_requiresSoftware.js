const data = require('../data/systemRequirements_requiresSoftware');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('systemRequirements_requires_software', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('systemRequirements_requires_software', {}, {});
	}
};
