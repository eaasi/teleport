const data = require('../../data/sample_data/systemRequirements_requiresGpuDevice');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('system_requirements_requires_gpu_device', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('system_requirements_requires_gpu_device', {}, {});
	}
};
