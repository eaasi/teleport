const data = require('../data/systemRequirements_requiresProcessorDevice');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('system_requirements_requires_processor', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('system_requirements_requires_processor', {}, {});
	}
};
