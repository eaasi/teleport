const data = require('../data/softwareProduct_hasAlternateName');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('softwareProduct_has_alternateName', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('softwareProduct_has_alternateName', {}, {});
	}
};
