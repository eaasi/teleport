const data = require('../../data/softwareVersion_hasFileOperation');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('software_version_has_file_operation', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('software_version_has_file_operation', {}, {});
	}
};
