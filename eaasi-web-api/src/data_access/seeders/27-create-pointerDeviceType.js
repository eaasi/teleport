const data = require('../data/pointerDeviceType');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('pointerDeviceType', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('pointerDeviceType', {}, {});
	}
};
