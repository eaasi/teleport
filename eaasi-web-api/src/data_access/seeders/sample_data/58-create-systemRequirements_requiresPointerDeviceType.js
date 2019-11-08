const data = require('../../data/sample_data/systemRequirements_requiresPointerDeviceType');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('system_requirements_requires_pointer_device_type', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('system_requirements_requires_pointer_device_type', {}, {});
	}
};
