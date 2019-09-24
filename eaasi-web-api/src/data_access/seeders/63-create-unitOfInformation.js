const data = require('../data/unitofinformation');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('unitOfInformation', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('unitOfInformation', {}, {});
	}
};
