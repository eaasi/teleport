const data = require('../../data/sample_data/file');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('file', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('file', {}, {});
	}
};

