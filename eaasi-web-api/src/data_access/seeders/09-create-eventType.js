const data = require('../data/eventType');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('eventType', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('eventType', {}, {});
	}
};
