const data = require('../../data/systemRequirements_requiresStorageDevice');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('system_requirements_requires_storage_device_type', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('system_requirements_requires_storage_device_type', {}, {});
	}
};
