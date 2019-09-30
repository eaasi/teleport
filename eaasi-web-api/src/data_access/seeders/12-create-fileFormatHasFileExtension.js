const data = require('../data/fileformat_hasfileextension');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('fileFormat_has_fileExtension', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('fileFormat_has_fileExtension', {}, {});
	}
};
