const colorDepth = require('../data/colorDepth');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('colorDepth', colorDepth);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('colorDepth', {}, {});
	}
};
