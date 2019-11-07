const data = require('../data/operationtype');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('operation_type', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('operation_type', {}, {});
	}
};
