const data = require('../data/timezonelabel');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('timezoneLabel', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('timezoneLabel', {}, {});
	}
};
