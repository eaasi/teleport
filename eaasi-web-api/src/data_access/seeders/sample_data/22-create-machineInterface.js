const data = require('../../data/machineInterface');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('machine_interface', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('machine_interface', {}, {});
	}
};
