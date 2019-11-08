const data = require('../../data/sample_data/softwareVersion_hasDeveloper');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('software_version_has_developer', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('software_version_has_developer', {}, {});
	}
};
