const data = require('../data/softwareVersion_hasProgrammingLanguage');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('softwareVersion_has_programmingLanguage', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('softwareVersion_has_programmingLanguage', {}, {});
	}
};
