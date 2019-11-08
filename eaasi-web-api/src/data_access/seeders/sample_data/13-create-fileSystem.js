const data = require('../../data/sample_data/fileSystem');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('file_system', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('file_system', {}, {});
	}
};
