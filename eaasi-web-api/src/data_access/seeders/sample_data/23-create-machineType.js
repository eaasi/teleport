const data = require('../../data/sample_data/machinetype');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('machine_type', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('machine_type', {}, {});
	}
};
