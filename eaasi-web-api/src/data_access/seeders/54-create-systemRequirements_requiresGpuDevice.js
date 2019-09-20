const data = require('../data/systemRequirements_requiresGpuDevice');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('systemRequirements_requires_gpuDevice', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('systemRequirements_requires_gpuDevice', {}, {});
	}
};
