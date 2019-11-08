const data = require('../../data/sample_data/softwareVersion_hasLanguageSettings');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('software_version_has_language_settings', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('software_version_has_language_settings', {}, {});
	}
};
