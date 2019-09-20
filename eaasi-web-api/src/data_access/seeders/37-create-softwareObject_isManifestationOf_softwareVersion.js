const data = require('../data/softwareObject_isManifestationOf_softwareVersion');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('softwareObject_isManifestationOf_softwareVersion', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('softwareObject_isManifestationOf_softwareVersion', {}, {});
	}
};
