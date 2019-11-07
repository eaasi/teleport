const data = require('../data/eventType');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('event_type', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('event_type', {}, {});
	}
};
