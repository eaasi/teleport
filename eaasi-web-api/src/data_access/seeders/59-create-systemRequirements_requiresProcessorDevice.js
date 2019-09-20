const data = require('../data/systemRequirements_requiresProcessorDevice');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('systemRequirements_requires_processor', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('systemRequirements_requires_processor', {}, {});
	}
};
