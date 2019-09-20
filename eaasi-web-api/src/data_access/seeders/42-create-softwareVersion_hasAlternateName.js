const data = require('../data/softwareVersion_hasAlternateName');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('softwareVersion_has_alternateName', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('softwareVersion_has_alternateName', {}, {});
	}
};
