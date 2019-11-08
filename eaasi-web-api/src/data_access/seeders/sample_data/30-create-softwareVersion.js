const data = require('../../data/sample_data/softwareVersion');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('software_version', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('software_version', {}, {});
	}
};
