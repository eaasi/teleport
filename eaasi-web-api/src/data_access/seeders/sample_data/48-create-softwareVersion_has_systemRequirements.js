const data = require('../../data/softwareVersion_hasSystemRequirements');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('software_version_has_system_requirements', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('software_version_has_system_requirements', {}, {});
	}
};
