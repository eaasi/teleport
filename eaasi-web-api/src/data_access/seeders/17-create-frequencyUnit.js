const data = require('../data/frequencyunit');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('frequencyUnit', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('frequencyUnit', {}, {});
	}
};
