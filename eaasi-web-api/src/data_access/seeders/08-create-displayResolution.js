const data = require('../data/displayresolution');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('displayResolution', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('displayResolution', {}, {});
	}
};
