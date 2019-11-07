const data = require('../data/timezonelabel');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('timezone_label', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('timezone_label', {}, {});
	}
};
