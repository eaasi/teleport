const data = require('../data/programmingLanguages');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('programmingLanguage', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('programmingLanguage', {}, {});
	}
};
