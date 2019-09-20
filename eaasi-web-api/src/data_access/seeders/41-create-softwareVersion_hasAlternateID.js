const data = require('../data/softwareVersion_hasAlternateID');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('softwareVersion_has_alternateID', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('softwareVersion_has_alternateID', {}, {});
	}
};
