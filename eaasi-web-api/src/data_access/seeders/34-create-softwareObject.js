const data = require('../data/softwareObject');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('softwareObject', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('softwareObject', {}, {});
	}
};
