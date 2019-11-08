const data = require('../../data/sample_data/storageDeviceType');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('storage_device_type', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('storage_device_type', {}, {});
	}
};
