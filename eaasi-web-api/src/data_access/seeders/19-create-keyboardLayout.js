const data = require('../data/keyboardLayout');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('keyboardLayout', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('keyboardLayout', {}, {});
	}
};
