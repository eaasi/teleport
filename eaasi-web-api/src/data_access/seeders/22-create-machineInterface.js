const data = require('../data/machineInterface');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('machineInterface', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('machineInterface', {}, {});
	}
};
