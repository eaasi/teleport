const data = require('../data/networkdevice');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('networkDevice', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('networkDevice', {}, {});
	}
};
