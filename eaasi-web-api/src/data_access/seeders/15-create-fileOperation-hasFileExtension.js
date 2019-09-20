const data = require('../data/fileOperation_hasFileExtension');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('fileOperation_has_fileExtension', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('fileOperation_has_fileExtension', {}, {});
	}
};
