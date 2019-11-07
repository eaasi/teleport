const data = require('../data/fileformat_hasmimetype');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('file_format_has_mime_type', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('file_format_has_mime_type', {}, {});
	}
};
