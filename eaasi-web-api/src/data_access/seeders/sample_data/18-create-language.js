const data = require('../../data/sample_data/language');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('language', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('language', {}, {});
	}
};
