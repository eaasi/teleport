const data = require('../data/softwareFamilyVersion_hasSoftwareVersion');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('softwareFamilyVersion_has_softwareVersion', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('softwareFamilyVersion_has_softwareVersion', {}, {});
	}
};
