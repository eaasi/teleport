const data = require('../data/softwareVersion_hasSystemRequirements');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('softwareVersion_has_systemRequirements', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('softwareVersion_has_systemRequirements', {}, {});
	}
};
