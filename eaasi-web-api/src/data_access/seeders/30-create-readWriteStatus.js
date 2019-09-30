const data = require('../data/readWriteStatus');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('readWriteStatus', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('readWriteStatus', {}, {});
	}
};
