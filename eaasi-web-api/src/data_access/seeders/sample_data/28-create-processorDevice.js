const data = require('../../data/sample_data/processorDevice');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('processor_device', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('processor_device', {}, {});
	}
};
