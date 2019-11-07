const data = require('../../data/softwareFamily_hasSoftwareProduct');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('software_family_version_has_software_product', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('software_family_version_has_software_product', {}, {});
	}
};
