const data = require('../../data/readWriteStatus');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('read_write_status', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('read_write_status', {}, {});
	}
};
