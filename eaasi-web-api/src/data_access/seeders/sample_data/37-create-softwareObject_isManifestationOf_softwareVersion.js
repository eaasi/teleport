const data = require('../../data/softwareObject_isManifestationOf_softwareVersion');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('software_object_is_manifestation_of_software_version', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('software_object_is_manifestation_of_software_version', {}, {});
	}
};
