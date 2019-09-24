const data = require('../data/systemRequirements_requiresPointerDeviceType');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('systemRequirements_requires_pointerDeviceType', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('systemRequirements_requires_pointerDeviceType', {}, {});
	}
};
