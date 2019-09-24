const data = require('../data/displayinterface');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('displayInterface', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('displayInterface', {}, {});
	}
};
