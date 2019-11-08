const data = require('../../data/sample_data/fileOperation');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('file_operation', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('file_operation', {}, {});
	}
};
