const data = require('../data/displayresolution');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('display_resolution', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('display_resolution', {}, {});
	}
};
