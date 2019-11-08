const data = require('../../data/sample_data/fileOperation_hasFileExtension');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('file_operation_has_file_extension', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('file_operation_has_file_extension', {}, {});
	}
};
