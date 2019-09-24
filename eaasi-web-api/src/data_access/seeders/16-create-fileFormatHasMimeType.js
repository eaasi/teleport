const data = require('../data/fileformat_hasmimetype');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('fileFormat_has_mimeType', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('fileFormat_has_mimeType', {}, {});
	}
};
