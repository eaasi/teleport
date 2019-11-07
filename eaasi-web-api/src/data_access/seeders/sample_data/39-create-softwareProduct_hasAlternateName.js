const data = require('../../data/softwareProduct_hasAlternateName');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('software_product_has_alternate_name', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('software_product_has_alternate_name', {}, {});
	}
};
