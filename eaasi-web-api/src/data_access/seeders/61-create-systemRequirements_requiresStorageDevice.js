const data = require('../data/systemRequirements_requiresStorageDevice');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('systemRequirements_requires_storageDevice', data);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('systemRequirements_requires_storageDevice', {}, {});
	}
};
