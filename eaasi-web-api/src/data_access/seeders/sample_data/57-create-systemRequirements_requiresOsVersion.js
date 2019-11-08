const data = require('../../data/sample_data/systemRequirements_requiresOSVersion');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('system_requirements_requires_os_version', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('system_requirements_requires_os_version', {}, {});
	}
};
