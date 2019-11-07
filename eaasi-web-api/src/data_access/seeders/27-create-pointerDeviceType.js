const data = require('../data/pointerDeviceType');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('pointer_device_type', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('pointer_device_type', {}, {});
	}
};
