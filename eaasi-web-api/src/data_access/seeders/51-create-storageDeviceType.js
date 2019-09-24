const data = require('../data/storageDeviceType');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('storageDeviceType', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('storageDeviceType', {}, {});
	}
};
