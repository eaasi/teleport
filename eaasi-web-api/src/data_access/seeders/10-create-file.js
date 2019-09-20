const data = require('../data/file');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('file', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('file', {}, {});
	}
};
