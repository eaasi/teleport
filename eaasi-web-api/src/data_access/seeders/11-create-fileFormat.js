const data = require('../data/fileFormat');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('fileFormat', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('fileFormat', {}, {});
	}
};
