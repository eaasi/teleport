const data = require('../../data/sample_data/unitofinformation');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('unit_of_information', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('unit_of_information', {}, {});
	}
};
