const data = require('../data/systemRequirements_requiresKeyboardDevice');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('systemRequirements_requiresKeyboardDevice', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('systemRequirements_requiresKeyboardDevice', {}, {});
	}
};
