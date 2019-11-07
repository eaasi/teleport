const data = require('../data/systemRequirements_requiresNetworkDevice');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('system_requirements_requires_network_device', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('system_requirements_requires_network_device', {}, {});
	}
};
