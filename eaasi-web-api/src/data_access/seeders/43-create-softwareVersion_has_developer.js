const data = require('../data/softwareVersion_hasDeveloper');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('softwareVersion_has_developer', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('softwareVersion_has_developer', {}, {});
	}
};
