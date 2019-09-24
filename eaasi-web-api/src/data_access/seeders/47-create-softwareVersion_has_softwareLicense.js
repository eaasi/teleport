const data = require('../data/softwareVersion_hasSoftwareLicense');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('softwareVersion_has_softwareLicense', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('softwareVersion_has_softwareLicense', {}, {});
	}
};
