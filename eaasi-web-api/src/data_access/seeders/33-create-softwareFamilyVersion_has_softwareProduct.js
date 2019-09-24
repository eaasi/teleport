const data = require('../data/softwareFamily_hasSoftwareProduct');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('softwareFamilyVersion_has_softwareProduct', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('softwareFamilyVersion_has_softwareProduct', {}, {});
	}
};
