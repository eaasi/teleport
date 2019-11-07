const data = require('../data/fileformat_hasfileextension');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('file_format_has_file_extension', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('file_format_has_file_extension', {}, {});
	}
};
