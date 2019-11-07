const data = require('../../data/softwareVersion_hasAlternateName');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('software_version_has_alternate_name', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('software_version_has_alternate_name', {}, {});
	}
};
