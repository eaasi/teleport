const data = require('../../data/sample_data/softwareObject');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('software_object', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('software_object', {}, {});
	}
};
