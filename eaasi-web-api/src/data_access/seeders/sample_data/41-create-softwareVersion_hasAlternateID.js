const data = require('../../data/sample_data/softwareVersion_hasAlternateID');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('software_version_has_alternate_id', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('software_version_has_alternate_id', {}, {});
	}
};
