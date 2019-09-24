const data = require('../data/machinetype');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('machineType', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('machineType', {}, {});
	}
};
