const data = require('../data/softwareProduct');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('softwareProduct', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('softwareProduct', {}, {});
	}
};
