const data = require('../data/softwareVersion_hasLanguageSettings');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('softwareVersion_has_languageSettings', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('softwareVersion_has_languageSettings', {}, {});
	}
};
