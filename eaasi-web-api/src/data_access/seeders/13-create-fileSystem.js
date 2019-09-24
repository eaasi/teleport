const data = require('../data/fileSystem');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('fileSystem', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('fileSystem', {}, {});
	}
};
