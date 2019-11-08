const data = require('../../data/sample_data/displayinterface');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('display_interface', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('display_interface', {}, {});
	}
};
