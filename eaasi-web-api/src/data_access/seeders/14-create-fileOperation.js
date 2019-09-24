const data = require('../data/fileOperation');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('fileOperation', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('fileOperation', {}, {});
	}
};
