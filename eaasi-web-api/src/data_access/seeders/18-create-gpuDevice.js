const data = require('../data/gpudevice');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('gpu_device', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('gpu_device', {}, {});
	}
};
