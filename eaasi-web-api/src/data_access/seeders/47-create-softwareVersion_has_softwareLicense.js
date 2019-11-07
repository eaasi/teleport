const data = require('../data/softwareVersion_hasSoftwareLicense');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('software_version_has_software_license', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('software_version_has_software_license', {}, {});
	}
};
