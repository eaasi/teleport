const data = require('../data/mediaType');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('mediaType', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('mediaType', {}, {});
	}
};
