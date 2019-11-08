const data = require('../../data/sample_data/programmingLanguages');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('programming_language', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('programming_language', {}, {});
	}
};
