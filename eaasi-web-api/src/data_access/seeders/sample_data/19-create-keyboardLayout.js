const data = require('../../data/sample_data/keyboardLayout');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('keyboard_layout', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('keyboard_layout', {}, {});
	}
};
