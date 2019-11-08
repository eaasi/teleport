const data = require('../../data/sample_data/softwareObject_hasObjectFile');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('software_object_has_object_file', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('software_object_has_object_file', {}, {});
	}
};
