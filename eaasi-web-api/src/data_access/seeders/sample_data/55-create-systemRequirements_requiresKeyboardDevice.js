const data = require('../../data/systemRequirements_requiresKeyboardDevice');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('system_requirements_requires_keyboard_device', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('system_requirements_requires_keyboard_device', {}, {});
	}
};
