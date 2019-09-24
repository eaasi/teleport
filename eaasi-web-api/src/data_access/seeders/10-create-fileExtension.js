const data = require('../data/fileExtension');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('fileExtension', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('fileExtension', {}, {});
	}
};
