const data = require('../data/mediaType');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('media_type', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('media_type', {}, {});
	}
};
