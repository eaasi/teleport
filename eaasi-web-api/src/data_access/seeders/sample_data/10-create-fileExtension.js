const data = require('../../data/sample_data/fileExtension');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('file_extension', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('file_extension', {}, {});
	}
};
