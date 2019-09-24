const data = require('../data/timezone');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('timezone', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('timezone', {}, {});
	}
};
