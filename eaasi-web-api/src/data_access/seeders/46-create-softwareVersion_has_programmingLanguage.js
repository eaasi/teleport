const data = require('../data/softwareVersion_hasProgrammingLanguage');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('software_version_has_programming_language', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('software_version_has_programming_language', {}, {});
	}
};
