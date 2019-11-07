const data = require('../data/frequencyunit');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('frequency_unit', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('frequency_unit', {}, {});
	}
};
