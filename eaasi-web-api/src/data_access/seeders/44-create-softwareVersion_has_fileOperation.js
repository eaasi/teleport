const data = require('../data/softwareVersion_hasFileOperation');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('softwareVersion_has_fileOperation', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('softwareVersion_has_fileOperation', {}, {});
	}
};
