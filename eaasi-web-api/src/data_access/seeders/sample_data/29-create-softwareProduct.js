const data = require('../../data/softwareProduct');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('software_product', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('software_product', {}, {});
	}
};
