const data = require('../data/softwareVersion');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('softwareVersion', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('softwareVersion', {}, {});
	}
};
