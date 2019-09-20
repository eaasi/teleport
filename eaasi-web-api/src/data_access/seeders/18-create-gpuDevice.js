const data = require('../data/gpudevice');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('gpuDevice', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('gpuDevice', {}, {});
	}
};
