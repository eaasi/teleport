const data = require('../data/displayinterface');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('display_interface', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('display_interface', {}, {});
	}
};
