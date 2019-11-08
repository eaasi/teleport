const data = require('../../data/sample_data/operationtype');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('operation_type', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('operation_type', {}, {});
	}
};
