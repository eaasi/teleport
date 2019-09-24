const data = require('../data/softwareObject_hasObjectFile');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('softwareObject_has_objectFile', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('softwareObject_has_objectFile', {}, {});
	}
};
