const data = require('../../data/sample_data/networkdevice');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('network_device', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('network_device', {}, {});
	}
};
