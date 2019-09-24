const data = require('../data/systemRequirements_requiresNetworkDevice');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('systemRequirements_requires_networkDevice', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('systemRequirements_requires_networkDevice', {}, {});
	}
};
