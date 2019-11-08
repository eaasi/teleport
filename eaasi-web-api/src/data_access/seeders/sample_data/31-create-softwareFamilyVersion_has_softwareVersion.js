const data = require('../../data/sample_data/softwareFamilyVersion_hasSoftwareVersion');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('software_family_version_has_software_version', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('software_family_version_has_software_version', {}, {});
	}
};
