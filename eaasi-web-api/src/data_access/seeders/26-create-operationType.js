const data = require('../data/operationtype');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('operationType', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('operationType', {}, {});
	}
};
