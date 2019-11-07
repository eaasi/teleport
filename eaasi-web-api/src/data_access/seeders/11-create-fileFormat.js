const data = require('../data/fileFormat');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('file_format', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('file_format', {}, {});
	}
};
