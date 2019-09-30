const data = require('../data/softwareVersion_includesSoftwareVersion');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('softwareVersion_includes_softwareVersion', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('softwareVersion_includes_softwareVersion', {}, {});
	}
};
