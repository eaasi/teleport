const data = require('../../data/sample_data/keyboardDevice');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('keyboard_device', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('keyboard_device', {}, {});
	}
};
