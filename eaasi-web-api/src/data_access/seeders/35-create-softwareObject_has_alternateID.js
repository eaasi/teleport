const data = require('../data/softwareObject_hasAlternateID');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('softwareObject_has_alternateID', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('softwareObject_has_alternateID', {}, {});
	}
};
