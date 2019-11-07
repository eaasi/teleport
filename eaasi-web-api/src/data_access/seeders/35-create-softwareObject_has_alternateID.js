const data = require('../data/softwareObject_hasAlternateID');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('software_object_has_alternate_id', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('software_object_has_alternate_id', {}, {});
	}
};
