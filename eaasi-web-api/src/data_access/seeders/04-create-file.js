const data = require('../data/file');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('File.ts', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('File.ts', {}, {});
	}
};

