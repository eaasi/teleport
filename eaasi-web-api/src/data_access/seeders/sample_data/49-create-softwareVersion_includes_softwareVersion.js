const data = require('../../data/sample_data/softwareVersion_includesSoftwareVersion');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('software_version_includes_software_version', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('software_version_includes_software_version', {}, {});
	}
};
