const data = require('../data/systemRequirements_requiresOSVersion');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('systemRequirements_requires_osVersion', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('systemRequirements_requires_osVersion', {}, {});
	}
};
