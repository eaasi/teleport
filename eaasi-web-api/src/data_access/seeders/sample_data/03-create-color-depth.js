const colorDepth = require('../../data/sample_data/colorDepth');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('color_depth', colorDepth);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('color_depth', {}, {});
	}
};
