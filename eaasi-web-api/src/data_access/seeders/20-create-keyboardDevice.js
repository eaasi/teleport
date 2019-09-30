const data = require('../data/keyboardDevice');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('keyboardDevice', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('keyboardDevice', {}, {});
	}
};
